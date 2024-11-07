'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CreateTeamActionProps, DeleteTeamActionProps, UpdateTeamActionProps } from './types';

import Alert from '@/components/Alert';
import Button from '@/components/admin/Button';
import { Input, Select } from '@/components/admin/Input';
import { PlayerGetDto } from '@/dtos/player';
import { TeamCreateDto, TeamCreateDtoSchema, TeamGetDto, TeamUpdateDto, TeamUpdateDtoSchema } from '@/dtos/team';
import { registerOptions } from '@/utils/client/forms';
import { getObjectsIds, Return } from '@/utils/common';

export type TeamEditFormProps = {
    tournamentId: string;
    players: PlayerGetDto[];
} & (
    | {
          type: 'create';
          team?: undefined;
          createAction: (props: CreateTeamActionProps) => Promise<Return | undefined>;
          updateAction?: undefined;
          deleteAction?: undefined;
      }
    | {
          type: 'update';
          team: TeamGetDto;
          createAction?: undefined;
          updateAction: (props: UpdateTeamActionProps) => Promise<Return>;
          deleteAction: (props: DeleteTeamActionProps) => Promise<Return | undefined>;
      }
);

export default function TeamEditForm({
    tournamentId,
    players,
    type,
    team,
    createAction,
    updateAction,
    deleteAction,
}: TeamEditFormProps) {
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
        setError,
    } = useForm<TeamCreateDto | TeamUpdateDto>({
        mode: 'all',
        resolver: zodResolver(type === 'create' ? TeamCreateDtoSchema : TeamUpdateDtoSchema),
        defaultValues:
            type === 'update'
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
                const response =
                    type === 'create'
                        ? await createAction({ tournamentId, team: data })
                        : await updateAction({ teamId: team.id, team: data });
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
                <Select
                    label="Players"
                    register={() => register('players.0', registerOptions({ empty: '' }))}
                    error={errors.players && errors.players[0]?.message}
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
                >
                    {players.map(({ id: playerId, name: playerName }) => (
                        <option value={playerId} key={playerId}>
                            {playerName}
                        </option>
                    ))}
                </Select>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button color="primary" disabled={!isValid} className="flex-grow">
                        {type === 'create' ? 'Create Team' : 'Update Team'}
                    </Button>
                    {deleteAction && (
                        <Button
                            type="button"
                            color="danger"
                            onClick={async () => {
                                const response = await deleteAction({ teamId: team.id });
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
