import { RouteParams as ParentRouteParams } from '../route';

import { deleteGoal } from '@/services/matches';
import { RouteContext, auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    goalId: string;
}

export const DELETE = handle(
    auth({}, async (_: Request, { params: { matchId, goalId } }: RouteContext<RouteParams>) => {
        await deleteGoal(matchId, goalId);
        return new Response(null, { status: 204 });
    }),
);
