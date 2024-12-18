import { RouteParams as ParentRouteParams } from '../route';

import { MatchGameUpdateDtoSchema } from '@/dtos/match';
import { deleteGame, updateGame } from '@/services/matches';
import { RouteContext, auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    gameId: string;
}

export const PATCH = handle(
    auth({}, async (request: Request, { params: { gameId } }: RouteContext<RouteParams>) => {
        const data = await MatchGameUpdateDtoSchema.parseAsync(await request.json());
        return Response.json(await updateGame(gameId, data));
    }),
);

export const DELETE = handle(
    auth({}, async (_: Request, { params: { matchId, gameId } }: RouteContext<RouteParams>) => {
        await deleteGame(matchId, gameId);
        return new Response(null, { status: 204 });
    }),
);
