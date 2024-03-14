import { PlayerCreateDtoSchema } from '@/dtos/player';
import { createPlayer, listPlayers } from '@/services/players';
import { handle } from '../errors';

export const GET = handle(async () => {
    return Response.json(await listPlayers());
});

export const POST = handle(async (request: Request) => {
    const data = await PlayerCreateDtoSchema.parseAsync(await request.json());
    return Response.json(await createPlayer(data), { status: 201 });
});
