import { MatchUpdateDtoSchema } from '@/dtos/match';
import { deleteMatch, getMatch, updateMatch } from '@/services/matches';
import { handle } from '@/utils/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    matchId: string;
}

export const GET = handle(async (_: Request, { matchId }: RouteParams) => {
    return Response.json(await getMatch(matchId));
});

export const PATCH = handle(async (request: Request, { matchId }: RouteParams) => {
    const data = await MatchUpdateDtoSchema.parseAsync(await request.json());
    return Response.json(await updateMatch(matchId, data));
});

export const DELETE = handle(async (_: Request, {matchId}: RouteParams) => {
    await deleteMatch(matchId);
    return new Response(null, { status: 204 });
})
