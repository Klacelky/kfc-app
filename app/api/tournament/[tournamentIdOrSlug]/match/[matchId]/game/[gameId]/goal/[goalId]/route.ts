import { deleteGoal } from '@/services/matches';
import { RouteContext, auth, handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    goalId: string;
}

export const DELETE = handle(
    auth({}, async (_: Request, { params: { goalId } }: RouteContext<RouteParams>) => {
        await deleteGoal(goalId);
        return new Response(null, { status: 204 });
    }),
);
