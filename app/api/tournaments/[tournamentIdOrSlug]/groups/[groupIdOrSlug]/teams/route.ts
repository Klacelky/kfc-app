import { GroupAddTeamDtoSchema } from '@/dtos/group';
import { groupAddTeam } from '@/services/groups';
import { RouteContext, auth, handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {}

export const POST = handle(
    auth({}, async (request: Request, { params: { groupIdOrSlug } }: RouteContext<RouteParams>) => {
        const { teamId } = await GroupAddTeamDtoSchema.parseAsync(await request.json());
        return Response.json(await groupAddTeam(groupIdOrSlug, teamId));
    }),
);
