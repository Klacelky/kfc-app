import { TeamUpdateDtoSchema } from '@/dtos/team';
import { deleteTeam, getTeam, updateTeam } from '@/services/teams';
import { RouteContext, handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    teamIdOrAbbrev: string;
}

export const GET = handle(
    async (_: Request, { params: { tournamentIdOrSlug, teamIdOrAbbrev } }: RouteContext<RouteParams>) => {
        return Response.json(await getTeam(tournamentIdOrSlug, teamIdOrAbbrev));
    },
);

export const PUT = handle(async (request: Request, { params: { teamIdOrAbbrev } }: RouteContext<RouteParams>) => {
    const data = await TeamUpdateDtoSchema.parseAsync(await request.json());
    return Response.json(await updateTeam(teamIdOrAbbrev, data));
});

export const DELETE = handle(async (_: Request, { params: { teamIdOrAbbrev } }: RouteContext<RouteParams>) => {
    await deleteTeam(teamIdOrAbbrev);
    return new Response(null, { status: 204 });
});
