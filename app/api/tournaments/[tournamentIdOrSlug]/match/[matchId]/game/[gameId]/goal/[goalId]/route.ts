import { deleteGoal } from '@/services/matches';
import { handle } from '@/utils/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    goalId: string;
}

export const DELETE = handle(async (_: Request, { matchId, gameId, goalId }: RouteParams) => {
    return Response.json(await deleteGoal(matchId, gameId, goalId));
});
