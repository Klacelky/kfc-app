import { PlayerCreateDtoSchema } from '@/dtos/player';
import { createPlayer, listPlayers } from '@/services/players';
import { handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {}

export const GET = handle(async () => {
    return Response.json(await listPlayers());
});

export const POST = handle(async (request: Request) => {
    const data = await PlayerCreateDtoSchema.parseAsync(await request.json());
    return Response.json(await createPlayer(data), { status: 201 });
});
