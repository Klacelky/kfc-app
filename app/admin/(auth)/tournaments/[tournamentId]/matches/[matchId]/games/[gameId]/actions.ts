'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { DeleteGameActionProps, UpdateGameActionProps } from './types';

import { MatchGameUpdateDtoSchema } from '@/dtos/match';
import { deleteGame, updateGame } from '@/services/matches';
import { handleActionWithAnother } from '@/utils/server/actions';

export const updateGameAction = handleActionWithAnother(
    async ({ gameId, game }: UpdateGameActionProps) =>
        await updateGame(gameId, await MatchGameUpdateDtoSchema.parseAsync(game)),
    async ({ id }) => revalidatePath(`./${id}`),
    { requireAuth: true },
);

export const deleteGameAction = handleActionWithAnother(
    async ({ gameId }: DeleteGameActionProps) => await deleteGame(gameId),
    async () => redirect('..'),
    { requireAuth: true },
);
