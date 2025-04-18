import { RouteParams as ParentRouteParams } from '../route';

import { PlayerPositionsCreateDtoSchema } from '@/dtos/match';
import { createPlayerPositions } from '@/services/matches';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {}

export const POST = handle(
    auth({}, async (request: Request, { params }: RouteProps<RouteParams>) => {
        const { gameId } = await params;
        const data = await PlayerPositionsCreateDtoSchema.parseAsync(await request.json());
        return Response.json(await createPlayerPositions(gameId, data), { status: 201 });
    }),
);
