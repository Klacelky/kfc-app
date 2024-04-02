import { MatchGameUpdateDtoSchema } from '@/dtos/match';
import { deleteGame, updateGame } from '@/services/matches';
import { handle } from '@/utils/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    gameId: string;
}

export const PATCH = handle(async (request: Request, { matchId, gameId }: RouteParams) => {
    const data = await MatchGameUpdateDtoSchema.parseAsync(await request.json());
    return Response.json(await updateGame(matchId, gameId, data));
});

export const DELETE = handle(async (_: Request, { matchId, gameId }: RouteParams) => {
    return Response.json(await deleteGame(matchId, gameId));
});
