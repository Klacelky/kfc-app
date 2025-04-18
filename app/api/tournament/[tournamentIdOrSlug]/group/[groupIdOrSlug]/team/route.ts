import { RouteParams as ParentRouteParams } from '../route';

import { GroupAddTeamDtoSchema } from '@/dtos/group';
import { groupAddTeam } from '@/services/groups';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {}

export const POST = handle(
    auth({}, async (request: Request, { params }: RouteProps<RouteParams>) => {
        const { groupIdOrSlug } = await params;
        const { teamId } = await GroupAddTeamDtoSchema.parseAsync(await request.json());
        return Response.json(await groupAddTeam(groupIdOrSlug, teamId));
    }),
);
