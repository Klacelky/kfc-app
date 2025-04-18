import { RouteProps } from '@/utils/common';
import { AuthNextRequest, auth, handle } from '@/utils/server/api';
import prisma from '@/utils/server/db';

export interface RouteParams {}

export const dynamic = 'force-dynamic';

export const GET = handle(
    auth({ optional: true }, async (request: AuthNextRequest, context: RouteProps<RouteParams>) => {
        const adminCount = await prisma.adminUser.count();
        return Response.json({
            status: adminCount ? 'OK, I guess?' : 'OK, but alone...',
            auth: request.auth,
            context,
        });
    }),
);
