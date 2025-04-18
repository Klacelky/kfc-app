import { RouteParams as ParentRouteParams } from '../route';

import { deletePlayerPositions } from '@/services/matches';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    playerPositionsId: string;
}

export const DELETE = handle(
    auth({}, async (_: Request, { params }: RouteProps<RouteParams>) => {
        const { playerPositionsId } = await params;
        await deletePlayerPositions(playerPositionsId);
        return new Response(null, { status: 204 });
    }),
);
