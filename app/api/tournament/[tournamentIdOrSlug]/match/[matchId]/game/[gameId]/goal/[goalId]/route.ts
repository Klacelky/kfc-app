import { RouteParams as ParentRouteParams } from '../route';

import { deleteGoal } from '@/services/matches';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    goalId: string;
}

export const DELETE = handle(
    auth({}, async (_: Request, { params }: RouteProps<RouteParams>) => {
        const { matchId, goalId } = await params;
        await deleteGoal(matchId, goalId);
        return new Response(null, { status: 204 });
    }),
);
