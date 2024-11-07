'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { CreateTeamActionProps, DeleteTeamActionProps, UpdateTeamActionProps } from './types';

import { TeamCreateDtoSchema, TeamUpdateDtoSchema } from '@/dtos/team';
import { createTeam, deleteTeam, updateTeam } from '@/services/teams';
import { handleActionWithAnother } from '@/utils/server/actions';

export const createTeamAction = handleActionWithAnother(
    async ({ tournamentId, team }: CreateTeamActionProps) =>
        await createTeam(tournamentId, await TeamCreateDtoSchema.parseAsync(team)),
    async ({ id }) => redirect(`${id}`),
    { requireAuth: true },
);

export const updateTeamAction = handleActionWithAnother(
    async ({ teamId, team }: UpdateTeamActionProps) =>
        await updateTeam(teamId, await TeamUpdateDtoSchema.parseAsync(team)),
    async ({ id }) => revalidatePath(`${id}`),
    { requireAuth: true },
);

export const deleteTeamAction = handleActionWithAnother(
    async ({ teamId }: DeleteTeamActionProps) => await deleteTeam(teamId),
    async () => redirect('.'),
    { requireAuth: true },
);
