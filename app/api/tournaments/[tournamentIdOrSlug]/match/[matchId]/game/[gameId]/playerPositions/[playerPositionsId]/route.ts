import { deletePlayerPositions } from '@/services/matches';
import { handle } from '@/utils/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    playerPositionsId: string;
}

export const DELETE = handle(async (_: Request, { matchId, gameId, playerPositionsId }: RouteParams) => {
    return Response.json(await deletePlayerPositions(matchId, gameId, playerPositionsId));
});
