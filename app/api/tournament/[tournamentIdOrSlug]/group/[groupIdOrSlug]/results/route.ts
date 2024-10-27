import { RouteParams as ParentRouteParams } from '../route';

import { GroupResultsSetDtoSchema } from '@/dtos/group';
import { groupSetResults } from '@/services/groups';
import { RouteContext, auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    groupIdOrSlug: string;
}

export const PATCH = handle(
    auth({}, async (request: Request, { params: { groupIdOrSlug } }: RouteContext<RouteParams>) => {
        const data = await GroupResultsSetDtoSchema.parseAsync(await request.json());
        return Response.json(await groupSetResults(groupIdOrSlug, data));
    }),
);
