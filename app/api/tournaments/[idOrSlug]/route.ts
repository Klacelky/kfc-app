import { TournamentCreateDtoSchema } from '@/dtos/tournament';
import { deleteTournament, getTournament, updateTournament } from '@/services/tournaments';
import { handle } from '../../errors';

export interface RouteParams {
    idOrSlug: string;
}

export interface RouteContext {
    params: RouteParams;
}

export const GET = handle(async (_: Request, { params: { idOrSlug } }: RouteContext) => {
    return Response.json(await getTournament(idOrSlug));
});

export const PUT = handle(async (request: Request, { params: { idOrSlug } }: RouteContext) => {
    const data = await TournamentCreateDtoSchema.parseAsync(await request.json());
    return Response.json(await updateTournament(idOrSlug, data));
});

export const DELETE = handle(async (_: Request, { params: { idOrSlug } }: RouteContext) => {
    await deleteTournament(idOrSlug);
    return new Response('', { status: 204 });
});
