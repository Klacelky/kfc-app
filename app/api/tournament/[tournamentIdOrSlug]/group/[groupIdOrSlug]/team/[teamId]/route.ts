import { RouteParams as ParentRouteParams } from '../route';

import { groupRemoveTeam } from '@/services/groups';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    groupIdOrSlug: string;
    teamId: string;
}

export const DELETE = handle(
    auth({}, async (_: Request, { params }: RouteProps<RouteParams>) => {
        const { groupIdOrSlug, teamId } = await params;
        return Response.json(await groupRemoveTeam(groupIdOrSlug, teamId));
    }),
);
