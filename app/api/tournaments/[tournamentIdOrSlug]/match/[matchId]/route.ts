import { MatchUpdateDtoSchema } from '@/dtos/match';
import { deleteMatch, getMatch, updateMatch } from '@/services/matches';
import { RouteContext, auth, handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    matchId: string;
}

export const GET = handle(async (_: Request, { params: { matchId } }: RouteContext<RouteParams>) => {
    return Response.json(await getMatch(matchId));
});

export const PATCH = handle(
    auth({}, async (request: Request, { params: { matchId } }: RouteContext<RouteParams>) => {
        const data = await MatchUpdateDtoSchema.parseAsync(await request.json());
        return Response.json(await updateMatch(matchId, data));
    }),
);

export const DELETE = handle(
    auth({}, async (_: Request, { params: { matchId } }: RouteContext<RouteParams>) => {
        await deleteMatch(matchId);
        return new Response(null, { status: 204 });
    }),
);
