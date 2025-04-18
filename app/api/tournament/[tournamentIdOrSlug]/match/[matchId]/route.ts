import { RouteParams as ParentRouteParams } from '../route';

import { MatchUpdateDtoSchema } from '@/dtos/match';
import { deleteMatch, getMatch, updateMatch } from '@/services/matches';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    matchId: string;
}

export const GET = handle(async (_: Request, { params }: RouteProps<RouteParams>) => {
    const { matchId } = await params;
    return Response.json(await getMatch(matchId));
});

export const PATCH = handle(
    auth({}, async (request: Request, { params }: RouteProps<RouteParams>) => {
        const { matchId } = await params;
        const data = await MatchUpdateDtoSchema.parseAsync(await request.json());
        return Response.json(await updateMatch(matchId, data));
    }),
);

export const DELETE = handle(
    auth({}, async (_: Request, { params }: RouteProps<RouteParams>) => {
        const { matchId } = await params;
        await deleteMatch(matchId);
        return new Response(null, { status: 204 });
    }),
);
