import { GroupUpdateDtoSchema } from '@/dtos/group';
import { deleteGroup, getGroup, updateGroup } from '@/services/groups';
import { RouteContext, handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    groupIdOrSlug: string;
}

export const GET = handle(
    async (_: Request, { params: { tournamentIdOrSlug, groupIdOrSlug } }: RouteContext<RouteParams>) => {
        return Response.json(await getGroup(tournamentIdOrSlug, groupIdOrSlug));
    },
);

export const PUT = handle(async (request: Request, { params: { groupIdOrSlug } }: RouteContext<RouteParams>) => {
    const data = await GroupUpdateDtoSchema.parseAsync(await request.json());
    return Response.json(await updateGroup(groupIdOrSlug, data));
});

export const DELETE = handle(async (_: Request, { params: { groupIdOrSlug } }: RouteContext<RouteParams>) => {
    await deleteGroup(groupIdOrSlug);
    return new Response(null, { status: 204 });
});
