import { TournamentCreateDtoSchema } from '@/dtos/tournament';
import { createTournament, listTournaments } from '@/services/tournaments';
import { handle } from '@/utils/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {}

export const GET = handle(async () => {
    return Response.json(await listTournaments());
});

export const POST = handle(async (request: Request) => {
    const data = await TournamentCreateDtoSchema.parseAsync(await request.json());
    return Response.json(await createTournament(data), { status: 201 });
});
