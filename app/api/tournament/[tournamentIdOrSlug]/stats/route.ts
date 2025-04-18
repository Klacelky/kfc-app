import { RouteParams as ParentRouteParams } from '../route';

import { tournamentStats } from '@/services/stats';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {}

export const GET = handle(
    auth({}, async (_: Request, { params }: RouteProps<RouteParams>) => {
        const { tournamentIdOrSlug } = await params;
        return Response.json(await tournamentStats(tournamentIdOrSlug));
    }),
);
