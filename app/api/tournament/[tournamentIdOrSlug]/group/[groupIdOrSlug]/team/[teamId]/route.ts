import { groupRemoveTeam } from '@/services/groups';
import { RouteContext, auth, handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    groupIdOrSlug: string;
    teamId: string;
}

export const DELETE = handle(
    auth({}, async (_: Request, { params: { groupIdOrSlug, teamId } }: RouteContext<RouteParams>) => {
        return Response.json(await groupRemoveTeam(groupIdOrSlug, teamId));
    }),
);
