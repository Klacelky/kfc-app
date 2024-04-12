'use client';

import { PageParams } from '@/utils/server/pages';
import { RouteParams as ParentRouteParams } from '../page';
import { api, convertDate, getErrorMessage, useSWRSchema } from '@/utils/client/api';
import { MatchDetailedGetDtoSchema, MatchGameUpdateDto, MatchGameUpdateDtoSchema, TeamColorSchema } from '@/dtos/match';
import Alert from '@/components/admin/Alert';
import Loading from '@/components/Loading';
import { Select, Input } from '@/components/admin/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/admin/Button';
import { useRouter } from 'next/navigation';

export interface RouteParams extends ParentRouteParams {
    gameId: string;
}

export default function MatchGameEditPage({ params: { tournamentId, matchId, gameId } }: PageParams<RouteParams>) {
    const { replace } = useRouter();
    const { data, error, isLoading, mutate } = useSWRSchema(
        `/api/tournament/${tournamentId}/match/${matchId}`,
        MatchDetailedGetDtoSchema,
    );
    const game = data?.games.find(({ id }) => id === gameId);
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        setError,
    } = useForm<MatchGameUpdateDto>({
        mode: 'all',
        resolver: zodResolver(MatchGameUpdateDtoSchema),
        defaultValues: {
            ...game,
            startedAt: convertDate(game?.startedAt),
            finishedAt: convertDate(game?.finishedAt),
        },
    });

    if (error) {
        return <Alert>{getErrorMessage(error)}</Alert>;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <h1>Edit Game</h1>
            <form
                onSubmit={handleSubmit(async (formData) => {
                    try {
                        await api.patch(`/api/tournament/${tournamentId}/match/${matchId}/game/${gameId}`, formData);
                        mutate();
                    } catch (error) {
                        setError('root', { message: getErrorMessage(error) });
                    }
                })}
            >
                {errors.root && <Alert>{errors.root.message}</Alert>}
                <div className="flex flex-col gap-4">
                    <Input
                        {...register('startedAt')}
                        type="datetime-local"
                        label="Started At"
                        error={errors?.startedAt?.message}
                    />
                    <Input
                        {...register('finishedAt')}
                        type="datetime-local"
                        label="Finished At"
                        error={errors?.finishedAt?.message}
                    />
                    <Select
                        {...register('homeTeamColor')}
                        label="Home Team Color"
                        error={errors.homeTeamColor?.message}
                    >
                        {TeamColorSchema.options.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </Select>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="flex-grow" type="submit" color="primary" disabled={!isValid}>
                            Update Game
                        </Button>
                        <Button
                            className="flex-grow"
                            type="button"
                            color="danger"
                            onClick={async () => {
                                try {
                                    await api.delete(`/api/tournament/${tournamentId}/match/${matchId}/game/${gameId}`);
                                    mutate();
                                    replace('./');
                                } catch (error) {
                                    alert(getErrorMessage(error));
                                }
                            }}
                        >
                            Delete Game
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}
