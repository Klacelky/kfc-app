import { PlayerUpdateDtoSchema } from '@/dtos/player';
import { deletePlayer, getPlayer, updatePlayer } from '@/services/players';
import { handle } from '../../errors';

export interface RouteParams {
    id: string;
}

export interface RouteContext {
    params: RouteParams;
}

export const GET = handle(async (_: Request, { params: { id } }: RouteContext) => {
    return Response.json(await getPlayer(id));
});

export const PUT = handle(async (request: Request, { params: { id } }: RouteContext) => {
    const data = await PlayerUpdateDtoSchema.parseAsync(await request.json());
    return Response.json(await updatePlayer(id, data));
});

export const DELETE = handle(async (_: Request, { params: { id } }: RouteContext) => {
    await deletePlayer(id);
    return new Response(null, { status: 204 });
});
