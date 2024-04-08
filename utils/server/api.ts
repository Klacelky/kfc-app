import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { AuthAdmin } from '@/dtos/auth';
import { verifyAdmin } from '@/services/auth';

export function handle<TContext>(fn: (request: NextRequest, context: TContext) => Promise<Response | NextResponse>) {
    return async (request: NextRequest, context: TContext) => {
        try {
            return await fn(request, context);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    return Response.json(
                        {
                            error: 'Not Found',
                            message: 'Requested entity was not found or is not accessible',
                        },
                        { status: 404 },
                    );
                }
                if (error.code == 'P2018') {
                    return Response.json(
                        {
                            error: 'Not Found',
                            message: 'Requested child entity was not found or is not accessible',
                        },
                        { status: 404 },
                    );
                }
                if (error.code == 'P2002') {
                    return Response.json(
                        { error: 'Conflict', message: 'Requested value already exists', target: error.meta?.target },
                        { status: 409 },
                    );
                }
            }
            if (error instanceof SyntaxError) {
                return Response.json({ error: 'Bad Request', message: error.message }, { status: 400 });
            }
            if (error instanceof ZodError) {
                return Response.json(
                    { error: 'Bad Request', message: 'Request body is invalid', issues: error.issues },
                    { status: 400 },
                );
            }
            console.error(error);
            return Response.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    };
}

export type RouteContext<TParams> = {
    params: TParams;
};

export interface AuthOptions {
    optional?: boolean;
    su?: boolean;
}

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
