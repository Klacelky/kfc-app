import { RouteParams as ParentRouteParams } from '../route';

import { TournamentCreateDtoSchema } from '@/dtos/tournament';
import { deleteTournament, getTournament, updateTournament } from '@/services/tournaments';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    tournamentIdOrSlug: string;
}

export const GET = handle(async (_: Request, { params }: RouteProps<RouteParams>) => {
    const { tournamentIdOrSlug } = await params;
    return Response.json(await getTournament(tournamentIdOrSlug));
});

export const PUT = handle(
    auth({}, async (request: Request, { params }: RouteProps<RouteParams>) => {
        const { tournamentIdOrSlug } = await params;
        const data = await TournamentCreateDtoSchema.parseAsync(await request.json());
        return Response.json(await updateTournament(tournamentIdOrSlug, data));
    }),
);

export const DELETE = handle(
    auth({}, async (_: Request, { params }: RouteProps<RouteParams>) => {
        const { tournamentIdOrSlug } = await params;
        await deleteTournament(tournamentIdOrSlug);
        return new Response(null, { status: 204 });
    }),
);
