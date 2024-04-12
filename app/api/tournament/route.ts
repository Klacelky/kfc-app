import { TournamentCreateDtoSchema } from '@/dtos/tournament';
import { createTournament, listTournaments } from '@/services/tournaments';
import { auth, handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {}

export const GET = handle(async (_: Request) => {
    return Response.json(await listTournaments());
});

export const POST = handle(
    auth({}, async (request: Request) => {
        const data = await TournamentCreateDtoSchema.parseAsync(await request.json());
        return Response.json(await createTournament(data), { status: 201 });
    }),
);
