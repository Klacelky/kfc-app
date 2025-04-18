import { RouteParams as ParentRouteParams } from '../route';

import { GoalCreateDtoSchema } from '@/dtos/match';
import { createGoal } from '@/services/matches';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {}

export const POST = handle(
    auth({}, async (request: Request, { params }: RouteProps<RouteParams>) => {
        const { matchId, gameId } = await params;
        const data = await GoalCreateDtoSchema.parseAsync(await request.json());
        return Response.json(await createGoal(matchId, gameId, data), { status: 201 });
    }),
);
