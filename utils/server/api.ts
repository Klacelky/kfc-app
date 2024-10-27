import { NextRequest, NextResponse } from 'next/server';
import { handleError } from './common';
import { AuthAdmin } from '@/dtos/auth';
import { verifyAdmin } from '@/services/auth';

export function handle<TContext>(fn: (request: NextRequest, context: TContext) => Promise<Response | NextResponse>) {
    return async (request: NextRequest, context: TContext) => {
        const { data, error } = await handleError(async () => await fn(request, context));
        if (error) {
            return Response.json(error, { status: error.status });
        }
        return data;
    };
}

export type RouteContext<TParams> = {
    params: TParams;
};

export type AuthOptions = {
    optional?: boolean;
    su?: boolean;
};

export class AuthNextRequest extends NextRequest {
    auth?: AuthAdmin;
}

export function auth<TContext>(
    { optional, su }: AuthOptions,
    fn: (request: AuthNextRequest, context: TContext) => Promise<Response | NextResponse>,
) {
    return async (request: AuthNextRequest, context: TContext) => {
        try {
            const authCookie = request.cookies.get('jwt');
            const admin = await verifyAdmin(authCookie?.value || '');
            if (su && !admin.su) {
                return Response.json({ error: 'Forbidden' }, { status: 403 });
            }
            request.auth = admin;
        } catch (error) {
            if (!optional) {
                return Response.json({ error: 'Unauthorized' }, { status: 403 });
            }
        }
        return await fn(request, context);
    };
}
