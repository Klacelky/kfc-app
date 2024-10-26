'use client';

import {
    MatchCreateDto,
    MatchCreateDtoSchema,
    MatchDetailedGetDto,
    MatchUpdateDto,
    MatchUpdateDtoSchema,
    TeamSourceCreateDto,
    TeamSourceGetDto,
} from '@/dtos/match';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { TeamGetDto } from '@/dtos/team';
import { Input, Select, SelectProps } from '../Input';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '../Alert';
import { api, apiFetch, convertDate, getErrorMessage, handleApiCall } from '@/utils/client/api';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import { mutate } from 'swr';
import Loading from '@/components/Loading';
import { registerOptions } from '@/utils/client/forms';

function mapTeamSource({ group, match }: TeamSourceGetDto): TeamSourceCreateDto {
    return {
        group: group
            ? {
                  standing: group.standing,
                  sourceGroupId: group.sourceGroup.id,
              }
            : null,
        match: match
            ? {
                  winner: match.winner,
                  sourceMatchId: match.sourceMatch.id,
              }
            : null,
    };
}

export type MatchEditFormProps = {
    tournamentId: string;
    matchId?: string;
    values?: MatchDetailedGetDto;
};

function TeamSelect({
    teams,
    ...selectProps
}: SelectProps<Omit<MatchCreateDto | MatchUpdateDto, 'expectedStart'> & { expectedStart?: string }> & {
    teams: TeamGetDto[];
}) {
    return (
        <Select {...selectProps}>
            <option value="">(none)</option>
            {teams.map(({ id, name, abbrev }) => (
                <option key={id} value={id}>
                    {abbrev} - {name}
                </option>
            ))}
        </Select>
    );
}

export default function MatchEditForm({ tournamentId, values, matchId }: MatchEditFormProps) {
    const { replace } = useRouter();
    const {
        data: teams,
        error: teamsError,
        isLoading: teamsLoading,
    } = useSWR<TeamGetDto[], AxiosError>(`/api/tournament/${tournamentId}/team`, apiFetch);
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
        setError,
    } = useForm<MatchCreateDto | MatchUpdateDto>({
        mode: 'all',
        resolver: zodResolver(matchId ? MatchUpdateDtoSchema : MatchCreateDtoSchema),
        defaultValues: {
            name: values?.name,
            expectedStart: values?.expectedStart,
            playoffLayer: values?.playoffLayer,
            homeTeamId: values?.homeTeam?.id,
            visitingTeamId: values?.visitingTeam?.id,
            // homeTeamSource: values?.homeTeamSource ? mapTeamSource(values.homeTeamSource) : null,
            // visitingTeamSource: values?.visitingTeamSource ? mapTeamSource(values.visitingTeamSource) : null,
        },
    });

    return (
        <form
            onSubmit={handleSubmit(async (formData) => {
                console.log(formData);
                return;
                try {
                    const response = await (matchId
                        ? api.patch<MatchDetailedGetDto>(`/api/tournament/${tournamentId}/match/${matchId}`, formData)
                        : api.post<MatchDetailedGetDto>(`/api/tournament/${tournamentId}/match`, formData));
                    mutate(`/api/tournament/${tournamentId}/match`);
                    if (!matchId) {
                        replace(response.data.id);
                    } else {
                        mutate(`/api/tournament/${tournamentId}/match/${matchId}`);
                    }
                } catch (error) {
                    setError('root', { message: getErrorMessage(error) });
                }
            })}
        >
            {errors?.root && <Alert>{errors.root.message}</Alert>}
            <div className="flex flex-col  gap-4">
                <Input
                    register={() => register('name', registerOptions({ empty: 'null' }))}
                    type="text"
                    label="Name"
                    error={errors.name?.message}
                />
                <Input
                    register={() => register('expectedStart', registerOptions({ empty: 'null', date: true }))}
                    type="datetime-local"
                    label="Expected Start"
                    error={errors.expectedStart?.message}
                />
                <Input
                    register={() => register('playoffLayer', registerOptions({ empty: 'null', number: true }))}
                    type="number"
                    label="Play-off Level"
                    error={errors.playoffLayer?.message}
                />
                <div className="flex lg:flex-row flex-col gap-4 flex-grow">
                    {teamsError && <Alert>{getErrorMessage(teamsError)}</Alert>}
                    {teamsLoading && <Loading />}
                    {teams && (
                        <>
                            <TeamSelect
                                register={() => register('homeTeamId', registerOptions({ empty: 'null' }))}
                                teams={teams}
                                label="Home Team"
                                className="flex-grow"
                                error={errors.homeTeamId?.message}
                            />
                            <TeamSelect
                                register={() => register('visitingTeamId', registerOptions({ empty: 'null' }))}
                                teams={teams}
                                label="Visiting Team"
                                className="flex-grow"
                                error={errors.visitingTeamId?.message}
                            />
                        </>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button color="primary" disabled={!isValid} className="flex-grow">
                        {matchId ? 'Update Match' : 'Create Match'}
                    </Button>
                    {matchId && (
                        <Button
                            color="danger"
                            className="flex-grow"
                            type="button"
                            onClick={async () => {
                                const { error } = await handleApiCall(() =>
                                    api.delete(`/api/tournament/${tournamentId}/match/${matchId}`),
                                );
                                if (error) {
                                    setError('root', { message: getErrorMessage(error) });
                                } else {
                                    mutate(`/api/tournament/${tournamentId}/match`);
                                    replace('./');
                                }
                            }}
                        >
                            Delete Match
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}
