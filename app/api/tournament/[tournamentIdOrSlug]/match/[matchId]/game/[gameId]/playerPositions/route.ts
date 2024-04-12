import { PlayerPositionsCreateDtoSchema } from '@/dtos/match';
import { createPlayerPositions } from '@/services/matches';
import { RouteContext, auth, handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {}

export const POST = handle(
    auth({}, async (request: Request, { params: { gameId } }: RouteContext<RouteParams>) => {
        const data = await PlayerPositionsCreateDtoSchema.parseAsync(await request.json());
        return Response.json(await createPlayerPositions(gameId, data), { status: 201 });
    }),
);
