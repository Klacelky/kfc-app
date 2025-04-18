import { RouteParams as ParentRouteParams } from '../route';

import { MatchGameCreateDtoSchema } from '@/dtos/match';
import { createGame } from '@/services/matches';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {}

export const POST = handle(
    auth({}, async (request: Request, { params }: RouteProps<RouteParams>) => {
        const { matchId } = await params;
        const data = await MatchGameCreateDtoSchema.parseAsync(await request.json());
        return Response.json(await createGame(matchId, data), { status: 201 });
    }),
);
