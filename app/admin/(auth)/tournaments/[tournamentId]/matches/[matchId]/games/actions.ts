'use server';

import { revalidatePath } from 'next/cache';

import { createGame, finishMatch } from '@/services/matches';
import { handleActionWithAnother } from '@/utils/server/actions';

export const newGameAction = handleActionWithAnother(
    async (matchId: string) => await createGame(matchId, { homeTeamColor: 'BLUE' }),
    async () => revalidatePath(''),
    { requireAuth: true },
);

export const finishMatchAction = handleActionWithAnother(
    async (matchId: string) => await finishMatch(matchId, { updateSuccessiveMatches: true }),
    async () => revalidatePath(''),
    { requireAuth: true },
);
