import { AdminUpdateDtoSchema } from '@/dtos/admin';
import { deleteAdmin, getAdmin, updateAdmin } from '@/services/admins';
import { handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {
    adminId: string;
}

export const GET = handle(async (_: Request, { adminId }: RouteParams) => {
    return Response.json(await getAdmin(adminId));
});

export const PUT = handle(async (request: Request, { adminId }: RouteParams) => {
    const data = await AdminUpdateDtoSchema.parseAsync(await request.json());
    return Response.json(await updateAdmin(adminId, data));
});

export const DELETE = handle(async (_: Request, { adminId }: RouteParams) => {
    await deleteAdmin(adminId);
    return Response.json(null, { status: 204 });
});
