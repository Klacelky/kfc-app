import { cookies } from 'next/headers';

import { RouteParams as ParentRouteParams } from '../route';

import { AuthLoginDtoSchema } from '@/dtos/auth';
import { loginAdmin } from '@/services/auth';
import { AuthNextRequest, auth, handle } from '@/utils/server/api';

export interface RouteParams extends ParentRouteParams {}

export const GET = handle(
    auth({}, async (request: AuthNextRequest) => {
        return Response.json(request.auth);
    }),
);

export const POST = handle(async (request: Request) => {
    const cookieStore = await cookies();
    const data = await AuthLoginDtoSchema.parseAsync(await request.json());
    const jwt = await loginAdmin(data);
    if (jwt === null) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    cookieStore.set('jwt', jwt);
    return Response.json({ jwt }, { status: 201 });
});

export const DELETE = handle(
    auth({}, async () => {
        const cookieStore = await cookies();
        cookieStore.delete('jwt');
        return new Response(null, { status: 204 });
    }),
);
