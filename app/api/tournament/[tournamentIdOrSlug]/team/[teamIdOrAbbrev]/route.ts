import { RouteParams as ParentRouteParams } from '../route';

import { TeamUpdateDtoSchema } from '@/dtos/team';
import { deleteTeam, getTeam, updateTeam } from '@/services/teams';
import { RouteContext, auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    teamIdOrAbbrev: string;
}

export const GET = handle(
    async (_: Request, { params: { tournamentIdOrSlug, teamIdOrAbbrev } }: RouteContext<RouteParams>) => {
        return Response.json(await getTeam(tournamentIdOrSlug, teamIdOrAbbrev));
    },
);

export const PUT = handle(
    auth({}, async (request: Request, { params: { teamIdOrAbbrev } }: RouteContext<RouteParams>) => {
        const data = await TeamUpdateDtoSchema.parseAsync(await request.json());
        return Response.json(await updateTeam(teamIdOrAbbrev, data));
    }),
);

export const DELETE = handle(
    auth({}, async (_: Request, { params: { teamIdOrAbbrev } }: RouteContext<RouteParams>) => {
        await deleteTeam(teamIdOrAbbrev);
        return new Response(null, { status: 204 });
    }),
);
