import { RouteParams as ParentRouteParams } from '../route';

import { AdminCreateDtoSchema } from '@/dtos/admin';
import { createAdmin, listAdmins } from '@/services/admins';
import { auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {}

export const GET = handle(
    auth({}, async () => {
        return Response.json(await listAdmins());
    }),
);

export const POST = handle(
    auth({ su: true }, async (request: Request) => {
        const data = await AdminCreateDtoSchema.parseAsync(await request.json());
        return Response.json(await createAdmin(data), { status: 201 });
    }),
);
