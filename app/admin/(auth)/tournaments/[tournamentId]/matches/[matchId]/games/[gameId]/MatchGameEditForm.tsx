'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { deleteGameAction, updateGameAction } from './actions';

import Alert from '@/components/Alert';
import Button from '@/components/admin/Button';
import { Input, Select } from '@/components/admin/Input';
import { MatchGameGetDto, MatchGameUpdateDto, MatchGameUpdateDtoSchema, TeamColorSchema } from '@/dtos/match';
import { dateTimeToInput, registerOptions } from '@/utils/client/forms';

export type MatchGameUpdateFormProps = {
    game: MatchGameGetDto;
};

export function MatchGameEditForm({ game }: MatchGameUpdateFormProps) {
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
            startedAt: dateTimeToInput(game.startedAt),
            finishedAt: dateTimeToInput(game.finishedAt),
        },
    });
    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                const response = await updateGameAction({ gameId: game.id, game: data });
                if (response.error) {
                    setError('root', { message: response.error.message });
                }
            })}
        >
            {errors.root && <Alert>{errors.root.message}</Alert>}
            <div className="flex flex-col gap-4">
                <Input
                    register={() => register('startedAt', registerOptions({ empty: 'null', date: true }))}
                    type="datetime-local"
                    label="Started At"
                    error={errors?.startedAt?.message}
                />
                <Input
                    register={() => register('finishedAt', registerOptions({ empty: 'null', date: true }))}
                    type="datetime-local"
                    label="Finished At"
                    error={errors?.finishedAt?.message}
                />
                <Select
                    register={() => register('homeTeamColor')}
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
                    <Button className="grow" type="submit" color="primary" disabled={!isValid}>
                        Update Game
                    </Button>
                    <Button
                        className="grow"
                        type="button"
                        color="danger"
                        onClick={async () => {
                            const response = await deleteGameAction({ gameId: game.id });
                            if (response?.error) {
                                setError('root', { message: response.error.message });
                            }
                        }}
                    >
                        Delete Game
                    </Button>
                </div>
            </div>
        </form>
    );
}
