import { RouteParams as ParentRouteParams } from '../route';

import { PlayerUpdateDtoSchema } from '@/dtos/player';
import { deletePlayer, getPlayer, updatePlayer } from '@/services/players';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    playerId: string;
}

export const GET = handle(async (_: Request, { params }: RouteProps<RouteParams>) => {
    const { playerId } = await params;
    return Response.json(await getPlayer(playerId));
});

export const PUT = handle(
    auth({}, async (request: Request, { params }: RouteProps<RouteParams>) => {
        const { playerId } = await params;
        const data = await PlayerUpdateDtoSchema.parseAsync(await request.json());
        return Response.json(await updatePlayer(playerId, data));
    }),
);

export const DELETE = handle(
    auth({}, async (_: Request, { params }: RouteProps<RouteParams>) => {
        const { playerId } = await params;
        await deletePlayer(playerId);
        return new Response(null, { status: 204 });
    }),
);
