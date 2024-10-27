import { RouteParams as ParentRouteParams } from '../route';

import { TournamentCreateDtoSchema } from '@/dtos/tournament';
import { deleteTournament, getTournament, updateTournament } from '@/services/tournaments';
import { RouteContext, auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    tournamentIdOrSlug: string;
}

export const GET = handle(async (_: Request, { params: { tournamentIdOrSlug } }: RouteContext<RouteParams>) => {
    return Response.json(await getTournament(tournamentIdOrSlug));
});

export const PUT = handle(
    auth({}, async (request: Request, { params: { tournamentIdOrSlug } }: RouteContext<RouteParams>) => {
        const data = await TournamentCreateDtoSchema.parseAsync(await request.json());
        return Response.json(await updateTournament(tournamentIdOrSlug, data));
    }),
);

export const DELETE = handle(
    auth({}, async (_: Request, { params: { tournamentIdOrSlug } }: RouteContext<RouteParams>) => {
        await deleteTournament(tournamentIdOrSlug);
        return new Response(null, { status: 204 });
    }),
);
