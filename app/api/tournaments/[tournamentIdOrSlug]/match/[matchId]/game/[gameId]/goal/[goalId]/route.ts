import { deleteGoal } from '@/services/matches';
import { RouteContext, auth, handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    goalId: string;
}

export const DELETE = handle(
    auth({}, async (_: Request, { params: { matchId, gameId, goalId } }: RouteContext<RouteParams>) => {
        return Response.json(await deleteGoal(matchId, gameId, goalId));
    }),
);
