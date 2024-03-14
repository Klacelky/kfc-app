import { NotFoundError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function handle<TContext>(
    fn: (request: Request | NextRequest, context: TContext) => Promise<Response | NextResponse>,
) {
    return async (request: Request | NextRequest, context: TContext) => {
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
