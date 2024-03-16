import { deleteTournament, getTournament, updateTournament } from '@/services/tournaments';
import { handle } from '../../errors';
import { TournamentCreateDtoSchema } from '@/dtos/tournament';

export interface RouteParams {
    tournamentIdOrSlug: string;
}

export interface RouteContext {
    params: RouteParams;
}

export const GET = handle(async (_: Request, { params: { tournamentIdOrSlug } }: RouteContext) => {
    return Response.json(await getTournament(tournamentIdOrSlug));
});

export const PUT = handle(async (request: Request, { params: { tournamentIdOrSlug } }: RouteContext) => {
    const data = await TournamentCreateDtoSchema.parseAsync(await request.json());
    return Response.json(await updateTournament(tournamentIdOrSlug, data));
});

export const DELETE = handle(async (_: Request, { params: { tournamentIdOrSlug } }: RouteContext) => {
    await deleteTournament(tournamentIdOrSlug);
    return new Response('', { status: 204 });
});
