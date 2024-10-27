import { RouteParams as ParentRouteParams } from '../route';

import { deletePlayerPositions } from '@/services/matches';
import { RouteContext, auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    playerPositionsId: string;
}

export const DELETE = handle(
    auth({}, async (_: Request, { params: { playerPositionsId } }: RouteContext<RouteParams>) => {
        await deletePlayerPositions(playerPositionsId);
        return new Response(null, { status: 204 });
    }),
);
