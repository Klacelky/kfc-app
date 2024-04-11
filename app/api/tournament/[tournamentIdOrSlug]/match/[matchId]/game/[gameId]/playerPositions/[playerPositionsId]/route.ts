import { deletePlayerPositions } from '@/services/matches';
import { RouteContext, auth, handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    playerPositionsId: string;
}

export const DELETE = handle(
    auth({}, async (_: Request, {params: { matchId, gameId, playerPositionsId } }: RouteContext<RouteParams>) => {
        return Response.json(await deletePlayerPositions(matchId, gameId, playerPositionsId));
    }),
);
