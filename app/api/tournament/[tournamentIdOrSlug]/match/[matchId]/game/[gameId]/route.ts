import { RouteParams as ParentRouteParams } from '../route';

import { MatchGameUpdateDtoSchema } from '@/dtos/match';
import { deleteGame, updateGame } from '@/services/matches';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    gameId: string;
}

export const PATCH = handle(
    auth({}, async (request: Request, { params }: RouteProps<RouteParams>) => {
        const { gameId } = await params;
        const data = await MatchGameUpdateDtoSchema.parseAsync(await request.json());
        return Response.json(await updateGame(gameId, data));
    }),
);

export const DELETE = handle(
    auth({}, async (_: Request, { params }: RouteProps<RouteParams>) => {
        const { gameId } = await params;
        await deleteGame(gameId);
        return new Response(null, { status: 204 });
    }),
);
