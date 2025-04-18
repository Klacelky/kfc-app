import { RouteParams as ParentRouteParams } from '../route';

import { GroupUpdateDtoSchema } from '@/dtos/group';
import { deleteGroup, getGroup, updateGroup } from '@/services/groups';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    groupIdOrSlug: string;
}

export const GET = handle(async (_: Request, { params }: RouteProps<RouteParams>) => {
    const { tournamentIdOrSlug, groupIdOrSlug } = await params;
    return Response.json(await getGroup(tournamentIdOrSlug, groupIdOrSlug));
});

export const PUT = handle(
    auth({}, async (request: Request, { params }: RouteProps<RouteParams>) => {
        const { groupIdOrSlug } = await params;
        const data = await GroupUpdateDtoSchema.parseAsync(await request.json());
        return Response.json(await updateGroup(groupIdOrSlug, data));
    }),
);

export const DELETE = handle(
    auth({}, async (_: Request, { params }: RouteProps<RouteParams>) => {
        const { groupIdOrSlug } = await params;
        await deleteGroup(groupIdOrSlug);
        return new Response(null, { status: 204 });
    }),
);
