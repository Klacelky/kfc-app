'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { CreatePlayerActionProps, UpdatePlayerActionProps, DeletePlayerActionProps } from './types';

import { PlayerCreateDtoSchema, PlayerUpdateDtoSchema } from '@/dtos/player';
import { createPlayer, deletePlayer, updatePlayer } from '@/services/players';
import { handleActionWithAnother } from '@/utils/server/actions';

export const createPlayerAction = handleActionWithAnother(
    async ({ player }: CreatePlayerActionProps) => await createPlayer(await PlayerCreateDtoSchema.parseAsync(player)),
    async ({ id }) => redirect(`${id}`),
    { requireAuth: true },
);

export const updatePlayerAction = handleActionWithAnother(
    async ({ playerId, player }: UpdatePlayerActionProps) =>
        await updatePlayer(playerId, await PlayerUpdateDtoSchema.parseAsync(player)),
    async ({ id }) => revalidatePath(`${id}`),
    { requireAuth: true },
);

export const deletePlayerAction = handleActionWithAnother(
    async ({ playerId }: DeletePlayerActionProps) => await deletePlayer(playerId),
    async () => redirect('.'),
    { requireAuth: true },
);
