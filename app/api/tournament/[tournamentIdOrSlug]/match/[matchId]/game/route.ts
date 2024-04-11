import { MatchGameCreateDtoSchema } from '@/dtos/match';
import { createGame } from '@/services/matches';
import { RouteContext, auth, handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {}

export const POST = handle(
    auth({}, async (request: Request, { params: { matchId } }: RouteContext<RouteParams>) => {
        const data = await MatchGameCreateDtoSchema.parseAsync(await request.json());
        return Response.json(await createGame(matchId, data), { status: 201 });
    }),
);
