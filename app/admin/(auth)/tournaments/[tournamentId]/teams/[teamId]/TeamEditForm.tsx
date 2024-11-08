'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createTeamAction, deleteTeamAction, updateTeamAction } from './actions';

import Alert from '@/components/Alert';
import Button from '@/components/admin/Button';
import { Input, Select } from '@/components/admin/Input';
import { PlayerGetDto } from '@/dtos/player';
import { TeamCreateDto, TeamCreateDtoSchema, TeamGetDto, TeamUpdateDto, TeamUpdateDtoSchema } from '@/dtos/team';
import { registerOptions } from '@/utils/client/forms';
import { getObjectsIds } from '@/utils/common';

export type TeamEditFormProps = {
    tournamentId: string;
    players: PlayerGetDto[];
    team?: TeamGetDto;
};

export default function TeamEditForm({ tournamentId, players, team }: TeamEditFormProps) {
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
        setError,
    } = useForm<TeamCreateDto | TeamUpdateDto>({
        mode: 'all',
        resolver: zodResolver(team ? TeamUpdateDtoSchema : TeamCreateDtoSchema),
        defaultValues: team
            ? {
                  name: team.name,
                  abbrev: team.abbrev,
                  description: team.description,
                  players: getObjectsIds(team.players),
              }
            : { players: ['', ''] },
    });
    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                const response = team
                    ? await updateTeamAction({ teamId: team.id, team: data })
                    : await createTeamAction({ tournamentId, team: data });
                if (response?.error) {
                    setError('root', { message: response.error.message });
                }
            })}
        >
            {errors?.root && <Alert>{errors.root.message}</Alert>}
            <div className="flex flex-col gap-4">
                <Input register={() => register('name')} type="text" label="Name" error={errors.name?.message} />
                <Input
                    register={() => register('abbrev')}
                    type="text"
                    label="Abbreviation"
                    error={errors.abbrev?.message}
                />
                <Input
                    register={() => register('description')}
                    type="text"
                    label="Description"
                    error={errors.description?.message}
                />
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <Select
                        label="Players"
                        register={() => register('players.0', registerOptions({ empty: '' }))}
                        error={errors.players && errors.players[0]?.message}
                        className="flex-grow"
                    >
                        {players.map(({ id: playerId, name: playerName }) => (
                            <option value={playerId} key={playerId}>
                                {playerName}
                            </option>
                        ))}
                    </Select>
                    <Select
                        register={() => register('players.1', registerOptions({ empty: '' }))}
                        error={errors.players && (errors.players.message || errors.players[1]?.message)}
                        className="flex-grow"
                    >
                        {players.map(({ id: playerId, name: playerName }) => (
                            <option value={playerId} key={playerId}>
                                {playerName}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button color="primary" disabled={!isValid} className="flex-grow">
                        {team ? 'Update Team' : 'Create Team'}
                    </Button>
                    {team && (
                        <Button
                            type="button"
                            color="danger"
                            onClick={async () => {
                                const response = await deleteTeamAction({ teamId: team.id });
                                if (response?.error) {
                                    setError('root', { message: response.error.message });
                                }
                            }}
                            className="flex-grow"
                        >
                            Delete Team
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}
