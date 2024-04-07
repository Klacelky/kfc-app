import { AuthNextRequest, RouteContext, auth, handle } from '@/utils/server/api';

export interface RouteParams {}

export const GET = handle(
    auth({ optional: true }, async (request: AuthNextRequest, context: RouteContext<RouteParams>) => {
        return Response.json({
            status: 'OK, I guess?',
            auth: request.auth,
            context,
        });
    }),
);
