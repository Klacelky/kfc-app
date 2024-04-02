import { GoalCreateDtoSchema } from '@/dtos/match';
import { createGoal } from '@/services/matches';
import { handle } from '@/utils/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {}

export const POST = handle(async (request: Request, { matchId, gameId }: RouteParams) => {
    const data = await GoalCreateDtoSchema.parseAsync(await request.json());
    return Response.json(await createGoal(matchId, gameId, data), { status: 201 });
});
