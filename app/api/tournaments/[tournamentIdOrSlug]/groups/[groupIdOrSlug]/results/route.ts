import { GroupResultsSetDtoSchema } from '@/dtos/group';
import { groupSetResults } from '@/services/groups';
import { RouteContext, handle } from '@/utils/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    groupIdOrSlug: string;
}

export const PATCH = handle(async (request: Request, { params: { groupIdOrSlug } }: RouteContext<RouteParams>) => {
    const data = await GroupResultsSetDtoSchema.parseAsync(await request.json());
    return Response.json(await groupSetResults(groupIdOrSlug, data));
});
