'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createPlayerAction, deletePlayerAction, updatePlayerAction } from './actions';

import Alert from '@/components/Alert';
import Button from '@/components/admin/Button';
import { Input } from '@/components/admin/Input';
import {
    PlayerCreateDto,
    PlayerCreateDtoSchema,
    PlayerGetDto,
    PlayerUpdateDto,
    PlayerUpdateDtoSchema,
} from '@/dtos/player';

export type PlayerEditFormProps = {
    player?: PlayerGetDto;
};

export default function PlayerEditForm({ player }: PlayerEditFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setError,
    } = useForm<PlayerCreateDto | PlayerUpdateDto>({
        mode: 'all',
        defaultValues: player
            ? {
                  name: player.name,
                  description: player.description,
              }
            : undefined,
        resolver: zodResolver(player ? PlayerUpdateDtoSchema : PlayerCreateDtoSchema),
    });
    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                const response = await (player
                    ? updatePlayerAction({ playerId: player.id, player: data })
                    : createPlayerAction({ player: data }));
                if (response && response.error) {
                    setError('root', { message: response.error.message });
                }
            })}
        >
            {errors.root && <Alert>{errors.root.message}</Alert>}
            <div className="flex flex-col gap-4">
                <Input type="text" register={() => register('name')} label="Name" error={errors.name?.message} />
                <Input
                    type="text"
                    register={() => register('description')}
                    label="Description"
                    error={errors.description?.message}
                />
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" className="grow" color="primary" disabled={!isValid}>
                        {player ? 'Update Player' : 'Create Player'}
                    </Button>
                    {player && (
                        <Button
                            className="grow"
                            type="button"
                            color="danger"
                            onClick={async () => {
                                const response = await deletePlayerAction({ playerId: player.id });
                                if (response && response.error) {
                                    setError('root', { message: response.error.message });
                                }
                            }}
                        >
                            Delete Player
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}
