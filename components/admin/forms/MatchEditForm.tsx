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
import { Ref, forwardRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '../Alert';
import { api, apiFetch, getErrorMessage, handleApiCall } from '@/utils/client/api';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import { mutate } from 'swr';

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

export interface MatchEditFormProps {
    tournamentId: string;
    matchId?: string;
    values?: MatchDetailedGetDto;
}

const TeamSelect = forwardRef(function (
    { teams, ...rest }: { teams: TeamGetDto[] } & SelectProps,
    ref: Ref<HTMLSelectElement>,
) {
    return (
        <Select {...rest} ref={ref}>
            <option value="">(none)</option>
            {teams.map(({ id, name, abbrev }) => (
                <option key={id} value={id}>
                    {abbrev} - {name}
                </option>
            ))}
        </Select>
    );
});
TeamSelect.displayName = 'TeamSelect';

export default function MatchEditForm({ tournamentId, values, matchId }: MatchEditFormProps) {
    const { replace } = useRouter();
    const { data: teams, error: teamsError } = useSWR<TeamGetDto[], AxiosError>(
        `/api/tournament/${tournamentId}/team`,
        apiFetch,
    );
    const [error, setError] = useState<string>('');
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<MatchCreateDto | MatchUpdateDto>({
        mode: 'all',
        resolver: zodResolver(matchId ? MatchUpdateDtoSchema : MatchCreateDtoSchema),
        defaultValues: {
            ...values,
            homeTeamId: values?.homeTeam?.id,
            visitingTeamId: values?.visitingTeam?.id,
            homeTeamSource: values?.homeTeamSource ? mapTeamSource(values.homeTeamSource) : null,
            visitingTeamSource: values?.visitingTeamSource ? mapTeamSource(values.visitingTeamSource) : null,
        },
    });

    return (
        <form
            onSubmit={handleSubmit(async (formData) => {
                const { response, error } = await handleApiCall<MatchDetailedGetDto>(() =>
                    matchId
                        ? api.patch(`/api/tournament/${tournamentId}/match/${matchId}`, formData)
                        : api.post(`/api/tournament/${tournamentId}/match`, formData),
                );
                if (error) {
                    setError(error.message || error.error || 'Unknown error');
                } else {
                    setError('');
                    mutate(`/api/tournament/${tournamentId}/match`);
                    if (!matchId) {
                        replace(response!.data.id);
                    } else {
                        mutate(`/api/tournament/${tournamentId}/match/${matchId}`);
                    }
                }
            })}
        >
            {error && <Alert>{error}</Alert>}
            <div className="flex flex-col  gap-4">
                <Input {...register('name')} label="Name" error={errors.name?.message} />
                <Input
                    {...register('expectedStart', { setValueAs: (v) => v || null })}
                    label="Expected Start"
                    type="datetime-local"
                    error={errors.expectedStart?.message}
                />
                <Input
                    {...register('playoffLayer', { setValueAs: (v) => (v === '' ? null : v) })}
                    label="Play-off Level"
                    error={errors.playoffLayer?.message}
                />
                <div className="flex flex-row gap-4 flex-grow">
                    {teamsError ? (
                        <Alert>{getErrorMessage(teamsError)}</Alert>
                    ) : (
                        teams && (
                            <>
                                <TeamSelect
                                    {...register('homeTeamId', { setValueAs: (v) => v || null })}
                                    teams={teams}
                                    label="Home Team"
                                    className="flex-grow"
                                    error={errors.homeTeamId?.message}
                                />
                                <TeamSelect
                                    {...register('visitingTeamId', { setValueAs: (v) => v || null })}
                                    teams={teams}
                                    label="Visiting Team"
                                    className="flex-grow"
                                    error={errors.visitingTeamId?.message}
                                />
                            </>
                        )
                    )}
                </div>
                <div className="flex flex-row gap-4">
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
                                    setError(error.message || error.error || 'Unknown error');
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
