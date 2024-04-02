import { PlayerPositionsCreateDtoSchema } from '@/dtos/match';
import { createPlayerPositions } from '@/services/matches';
import { handle } from '@/utils/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {}

export const POST = handle(async (request: Request, { matchId, gameId }: RouteParams) => {
    const data = await PlayerPositionsCreateDtoSchema.parseAsync(await request.json());
    return Response.json(await createPlayerPositions(matchId, gameId, data));
});
