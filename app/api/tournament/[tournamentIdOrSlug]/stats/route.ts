import { tournamentStats } from '@/services/stats';
import { RouteContext, auth, handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {}

export const GET = handle(
    auth({}, async (request: Request, { params: { tournamentIdOrSlug } }: RouteContext<RouteParams>) => {
        return Response.json(await tournamentStats(tournamentIdOrSlug));
    }),
);
