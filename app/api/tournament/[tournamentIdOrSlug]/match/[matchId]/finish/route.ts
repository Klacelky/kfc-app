import { RouteParams as ParentRouteParams } from '../route';

import { MatchFinishDtoSchema } from '@/dtos/match';
import { finishMatch } from '@/services/matches';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    matchId: string;
}

export const POST = handle(
    auth({}, async (request: Request, { params }: RouteProps<RouteParams>) => {
        const { matchId } = await params;
        const data = await MatchFinishDtoSchema.parseAsync(await request.json());
        return Response.json(await finishMatch(matchId, data));
    }),
);
