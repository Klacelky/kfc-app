import { PlayerUpdateDtoSchema } from '@/dtos/player';
import { deletePlayer, getPlayer, updatePlayer } from '@/services/players';
import { handle } from '../../errors';

export interface RouteParams {
    playerId: string;
}

export interface RouteContext {
    params: RouteParams;
}

export const GET = handle(async (_: Request, { params: { playerId } }: RouteContext) => {
    return Response.json(await getPlayer(playerId));
});

export const PUT = handle(async (request: Request, { params: { playerId } }: RouteContext) => {
    const data = await PlayerUpdateDtoSchema.parseAsync(await request.json());
    return Response.json(await updatePlayer(playerId, data));
});

export const DELETE = handle(async (_: Request, { params: { playerId } }: RouteContext) => {
    await deletePlayer(playerId);
    return new Response(null, { status: 204 });
});
