import { AuthNextRequest, RouteContext, auth, handle } from '@/utils/server/api';
import prisma from '@/utils/server/db';

export interface RouteParams {}

export const GET = handle(
    auth({ optional: true }, async (request: AuthNextRequest, context: RouteContext<RouteParams>) => {
        const adminCount = await prisma.adminUser.count();
        return Response.json({
            status: adminCount ? 'OK, I guess?' : 'OK, but alone...',
            auth: request.auth,
            context,
        });
    }),
);
