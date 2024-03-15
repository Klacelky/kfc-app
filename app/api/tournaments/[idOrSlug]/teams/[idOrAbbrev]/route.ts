import { TeamUpdateDtoSchema } from '@/dtos/team';
import { deleteTeam, getTeam, updateTeam } from '@/services/teams';
import { handle } from '../../../../errors';
import { RouteParams as TournamentRouteParams } from '../../route';

export interface RouteParams extends TournamentRouteParams {
    idOrAbbrev: string;
}

export interface RouteContext {
    params: RouteParams;
}

export const GET = handle(async (_: Request, { params: { idOrAbbrev } }: RouteContext) => {
    return Response.json(await getTeam(idOrAbbrev));
});

export const PUT = handle(async (request: Request, { params: { idOrAbbrev } }: RouteContext) => {
    const data = await TeamUpdateDtoSchema.parseAsync(await request.json());
    return Response.json(await updateTeam(idOrAbbrev, data));
});

export const DELETE = handle(async (_: Request, { params: { idOrAbbrev } }: RouteContext) => {
    await deleteTeam(idOrAbbrev);
    return new Response();
});
