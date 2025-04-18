import { RouteParams as ParentRouteParams } from '../route';

import { GroupResultsSetDtoSchema } from '@/dtos/group';
import { groupSetResults } from '@/services/groups';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    groupIdOrSlug: string;
}

export const PATCH = handle(
    auth({}, async (request: Request, { params }: RouteProps<RouteParams>) => {
        const { groupIdOrSlug } = await params;
        const data = await GroupResultsSetDtoSchema.parseAsync(await request.json());
        return Response.json(await groupSetResults(groupIdOrSlug, data));
    }),
);
