import { MatchGameCreateDtoSchema } from '@/dtos/match';
import { createGame } from '@/services/matches';
import { handle } from '@/utils/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {}

export const POST = handle(async (request: Request, { matchId }: RouteParams) => {
    const data = await MatchGameCreateDtoSchema.parseAsync(await request.json());
    return Response.json(await createGame(matchId, data), { status: 201 });
});
