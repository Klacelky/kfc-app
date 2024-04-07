import { AdminCreateDtoSchema } from '@/dtos/admin';
import { createAdmin, listAdmins } from '@/services/admins';
import { handle } from '@/utils/server/api';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {}

export const GET = handle(async () => {
    return Response.json(await listAdmins());
});

export const POST = handle(async (request: Request) => {
    const data = await AdminCreateDtoSchema.parseAsync(await request.json());
    return Response.json(await createAdmin(data), { status: 201 });
});
