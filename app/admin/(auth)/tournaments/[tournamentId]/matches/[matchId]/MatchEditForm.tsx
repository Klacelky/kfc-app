'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';

import { createMatchAction, deleteMatchAction, updateMatchAction } from './actions';

import Alert from '@/components/Alert';
import Button from '@/components/admin/Button';
import { Checkbox, Input, Select } from '@/components/admin/Input';
import { GroupGetDto } from '@/dtos/group';
import {
    MatchCreateDto,
    MatchCreateDtoSchema,
    MatchDetailedGetDto,
    MatchGetDto,
    MatchUpdateDto,
    MatchUpdateDtoSchema,
    TeamSourceCreateDto,
    TeamSourceGetDto,
} from '@/dtos/match';
import { TeamGetDto } from '@/dtos/team';
import { dateTimeToInput, registerOptions } from '@/utils/client/forms';

function TeamSelectOptions({ teams }: { teams: TeamGetDto[] }) {
    return (
        <>
            <option value="">(none)</option>
            {teams.map(({ id, name, abbrev }) => (
                <option key={id} value={id}>
                    {abbrev} - {name}
                </option>
            ))}
        </>
    );
}

function TeamSourceInputs({
    form,
    teamType,
    groups,
    matches,
}: {
    form: UseFormReturn<MatchCreateDto | MatchUpdateDto>;
    teamType: 'home' | 'visiting';
    groups: GroupGetDto[];
    matches: MatchGetDto[];
}) {
    const {
        register,
        formState: { errors },
        getValues,
    } = form;
    console.log(errors);

    return (
        <div className="flex flex-col gap-4 flex-grow">
            <span>{teamType} source</span>
            <Select
                label="Team source type"
                register={() => register(`${teamType}.source.type`, registerOptions({ empty: 'null' }))}
            >
                <option value="">(None)</option>
                <option value="group">Group</option>
                <option value="match">Match</option>
            </Select>
            {(() => {
                switch (getValues(`${teamType}.source.type`)) {
                    case 'group':
                        return (
                            <>
                                <Select
                                    label="Source group"
                                    register={() =>
                                        register(`${teamType}.source.sourceGroupId`, { shouldUnregister: true })
                                    }
                                >
                                    {groups.map(({ id, name }) => (
                                        <option key={id} value={id}>
                                            {name || id}
                                        </option>
                                    ))}
                                </Select>
                                <Input
                                    type="number"
                                    label="Group standing"
                                    register={() => register(`${teamType}.source.standing`, { shouldUnregister: true })}
                                />
                            </>
                        );
                    case 'match':
                        return (
                            <>
                                <Select
                                    label="Source match"
                                    register={() =>
                                        register(`${teamType}.source.sourceMatchId`, { shouldUnregister: true })
                                    }
                                >
                                    {matches.map(({ id, name }) => (
                                        <option key={id} value={id}>
                                            {name || `(No name, id=${id})`}
                                        </option>
                                    ))}
                                </Select>
                                <Checkbox
                                    label="Match winner"
                                    register={() => register(`${teamType}.source.winner`, { shouldUnregister: true })}
                                />
                            </>
                        );
                    case null:
                        return null;
                }
            })()}
        </div>
    );
}

function getTeamSourceDefaults(source: TeamSourceGetDto | null): TeamSourceCreateDto | null {
    if (!source) {
        return { type: null };
    }
    switch (source.type) {
        case 'group':
            return {
                type: 'group',
                standing: source.standing,
                sourceGroupId: source.sourceGroup.id,
            };
        case 'match':
            return {
                type: 'match',
                winner: source.winner,
                sourceMatchId: source.sourceMatch.id,
            };
    }
}

export type MatchEditFormProps = {
    tournamentId: string;
    teams: TeamGetDto[];
    groups: GroupGetDto[];
    matches: MatchGetDto[];
    match?: MatchDetailedGetDto;
};

export default function MatchEditForm({ tournamentId, teams, groups, matches, match }: MatchEditFormProps) {
    const form = useForm<MatchCreateDto | MatchUpdateDto>({
        mode: 'all',
        resolver: zodResolver(match ? MatchUpdateDtoSchema : MatchCreateDtoSchema),
        defaultValues: match
            ? {
                  name: match.name,
                  expectedStart: dateTimeToInput(match.expectedStart),
                  playoffLayer: match.playoffLayer,
                  home: {
                      teamId: match.home.team?.id,
                      source: getTeamSourceDefaults(match.home.source),
                  },
                  visiting: {
                      teamId: match.visiting.team?.id,
                      source: getTeamSourceDefaults(match.visiting.source),
                  },
              }
            : undefined,
    });
    const {
        register,
        handleSubmit,
        formState: { isValid, errors, defaultValues },
        setError,
    } = form;

    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                const response = match
                    ? await updateMatchAction({ matchId: match.id, match: data })
                    : await createMatchAction({ tournamentId, match: data });
                if (response?.error) {
                    setError('root', { message: response.error.message });
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
                    register={() => register('expectedStart', { ...registerOptions({ empty: 'null', date: true }) })}
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
                    <Select
                        register={() => register('home.teamId', registerOptions({ empty: 'null' }))}
                        label="Home Team"
                        className="flex-grow"
                        error={errors.home?.teamId?.message}
                    >
                        <TeamSelectOptions teams={teams} />
                    </Select>
                    <Select
                        register={() => register('visiting.teamId', registerOptions({ empty: 'null' }))}
                        label="Visiting Team"
                        className="flex-grow"
                        error={errors.visiting?.teamId?.message}
                    >
                        <TeamSelectOptions teams={teams} />
                    </Select>
                </div>
                <div className="flex lg:flex-row flex-col gap-4 flex-grow">
                    <TeamSourceInputs form={form} teamType="home" groups={groups} matches={matches} />
                    <TeamSourceInputs form={form} teamType="visiting" groups={groups} matches={matches} />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button color="primary" disabled={!isValid} className="flex-grow">
                        {match ? 'Update Match' : 'Create Match'}
                    </Button>
                    {match && (
                        <Button
                            color="danger"
                            className="flex-grow"
                            type="button"
                            onClick={async () => {
                                const response = await deleteMatchAction({ matchId: match.id });
                                if (response?.error) {
                                    setError('root', { message: response.error.message });
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
