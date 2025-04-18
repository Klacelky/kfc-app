import { RouteParams as ParentRouteParams } from '../route';

import { GroupCreateDtoSchema } from '@/dtos/group';
import { createGroup, listGroups } from '@/services/groups';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {}

export const GET = handle(async (_: Request, { params }: RouteProps<RouteParams>) => {
    const { tournamentIdOrSlug } = await params;
    return Response.json(await listGroups(tournamentIdOrSlug));
});

export const POST = handle(
    auth({}, async (request: Request, { params }: RouteProps<RouteParams>) => {
        const { tournamentIdOrSlug } = await params;
        const data = await GroupCreateDtoSchema.parseAsync(await request.json());
        return Response.json(await createGroup(tournamentIdOrSlug, data), { status: 201 });
    }),
);
