'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { CreateMatchActionProps, DeleteMatchActionProps, UpdateMatchActionProps } from './types';

import { MatchCreateDtoSchema, MatchUpdateDtoSchema } from '@/dtos/match';
import { createMatch, deleteMatch, updateMatch } from '@/services/matches';
import { handleActionWithAnother } from '@/utils/server/actions';

export const createMatchAction = handleActionWithAnother(
    async ({ tournamentId, match }: CreateMatchActionProps) =>
        await createMatch(tournamentId, await MatchCreateDtoSchema.parseAsync(match)),
    async ({ id }) => {
        redirect(`../${id}`);
    },
    { requireAuth: true },
);

export const updateMatchAction = handleActionWithAnother(
    async ({ matchId, match }: UpdateMatchActionProps) =>
        await updateMatch(matchId, await MatchUpdateDtoSchema.parseAsync(match)),
    async ({ id }) => revalidatePath(`${id}`),
    { requireAuth: true },
);

export const deleteMatchAction = handleActionWithAnother(
    async ({ matchId }: DeleteMatchActionProps) => await deleteMatch(matchId),
    async () => redirect('..'),
    { requireAuth: true },
);
