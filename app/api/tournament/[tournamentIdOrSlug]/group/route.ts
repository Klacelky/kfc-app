import { RouteParams as ParentRouteParams } from '../route';

import { GroupCreateDtoSchema } from '@/dtos/group';
import { createGroup, listGroups } from '@/services/groups';
import { RouteContext, auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {}

export const GET = handle(async (_: Request, { params: { tournamentIdOrSlug } }: RouteContext<RouteParams>) => {
    return Response.json(await listGroups(tournamentIdOrSlug));
});

export const POST = handle(
    auth({}, async (request: Request, { params: { tournamentIdOrSlug } }: RouteContext<RouteParams>) => {
        const data = await GroupCreateDtoSchema.parseAsync(await request.json());
        return Response.json(await createGroup(tournamentIdOrSlug, data), { status: 201 });
    }),
);
