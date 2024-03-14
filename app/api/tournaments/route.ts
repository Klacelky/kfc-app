import { createTournament, listTournaments } from '@/services/tournaments';
import { handle } from '../errors';
import { TournamentCreateDtoSchema } from '@/dtos/tournament';

export const GET = handle(async () => {
    return Response.json(await listTournaments());
});

export const POST = handle(async (request: Request) => {
    const data = await TournamentCreateDtoSchema.parseAsync(await request.json());
    return Response.json(await createTournament(data), { status: 201 });
});
