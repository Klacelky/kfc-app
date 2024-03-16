import { TeamUpdateDtoSchema } from '@/dtos/team';
import { deleteTeam, getTeam, updateTeam } from '@/services/teams';
import { handle } from '../../../../errors';
import { RouteParams as TournamentRouteParams } from '../../route';

export interface RouteParams extends TournamentRouteParams {
    teamIdOrAbbrev: string;
}

export interface RouteContext {
    params: RouteParams;
}

export const GET = handle(async (_: Request, { params: { tournamentIdOrSlug, teamIdOrAbbrev } }: RouteContext) => {
    return Response.json(await getTeam(tournamentIdOrSlug, teamIdOrAbbrev));
});

export const PUT = handle(async (request: Request, { params: { teamIdOrAbbrev } }: RouteContext) => {
    const data = await TeamUpdateDtoSchema.parseAsync(await request.json());
    return Response.json(await updateTeam(teamIdOrAbbrev, data));
});

export const DELETE = handle(async (_: Request, { params: { teamIdOrAbbrev } }: RouteContext) => {
    await deleteTeam(teamIdOrAbbrev);
    return new Response(null, { status: 204 });
});
