import { AdminUpdateDtoSchema } from '@/dtos/admin';
import { deleteAdmin, getAdmin, updateAdmin } from '@/services/admins';
import { RouteContext, auth, handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    adminId: string;
}

export const GET = handle(
    auth({}, async (_: Request, { params: { adminId } }: RouteContext<RouteParams>) => {
        return Response.json(await getAdmin(adminId));
    }),
);

export const PUT = handle(
    auth({}, async (request: Request, { params: { adminId } }: RouteContext<RouteParams>) => {
        const data = await AdminUpdateDtoSchema.parseAsync(await request.json());
        return Response.json(await updateAdmin(adminId, data));
    }),
);

export const DELETE = handle(
    auth({}, async (_: Request, { params: { adminId } }: RouteContext<RouteParams>) => {
        await deleteAdmin(adminId);
        return Response.json(null, { status: 204 });
    }),
);
