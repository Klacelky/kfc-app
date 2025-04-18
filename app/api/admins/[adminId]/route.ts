import { RouteParams as ParentRouteParams } from '../route';

import { AdminUpdateDtoSchema } from '@/dtos/admin';
import { deleteAdmin, getAdmin, updateAdmin } from '@/services/admins';
import { RouteProps } from '@/utils/common';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {
    adminId: string;
}

export const GET = handle(
    auth({}, async (_: Request, { params }: RouteProps<RouteParams>) => {
        const { adminId } = await params;
        return Response.json(await getAdmin(adminId));
    }),
);

export const PUT = handle(
    auth({}, async (request: Request, { params }: RouteProps<RouteParams>) => {
        const { adminId } = await params;
        const data = await AdminUpdateDtoSchema.parseAsync(await request.json());
        return Response.json(await updateAdmin(adminId, data));
    }),
);

export const DELETE = handle(
    auth({}, async (_: Request, { params }: RouteProps<RouteParams>) => {
        const { adminId } = await params;
        await deleteAdmin(adminId);
        return new Response(null, { status: 204 });
    }),
);
