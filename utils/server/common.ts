import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';

import { ErrorResponse, Return, ZodErrorResponse } from '../common';

export class BadRequestError extends Error {

}

export async function handleErrorChain<T>(
    prevError: ErrorResponse | undefined,
    fn: () => Promise<T>,
): Promise<Return<T>> {
    if (prevError) {
        return { error: prevError };
    }
    return handleError(fn);
}

export function responseFromZodError<T>(error: ZodError): ZodErrorResponse<T> {
    return {
        status: 400,
        error: error.name,
        message: error.message,
        issues: error.flatten().fieldErrors as any,
    };
}

export async function handleError<T>(fn: () => Promise<T>): Promise<Return<T>> {
    try {
        return { data: await fn() };
    } catch (rawError) {
        if (rawError instanceof PrismaClientKnownRequestError) {
            if (rawError.code === 'P2025') {
                return {
                    error: {
                        status: 404,
                        error: 'Not Found',
                        message: 'Requested entity was not found or is not accessible',
                    },
                };
            }
            if (rawError.code == 'P2018') {
                return {
                    error: {
                        status: 404,
                        error: 'Not Found',
                        message: 'Requested child entity was not found or is not accessible',
                    },
                };
            }
            if (rawError.code == 'P2002') {
                return {
                    error: {
                        status: 409,
                        error: 'Conflict',
                        message: 'Requested value already exists',
                        target: rawError.meta?.target,
                    },
                };
            }
            if (rawError.code == 'P2003') {
                return {
                    error: {
                        status: 400,
                        error: 'Bad Request',
                        message: `Cannot manipulate ${rawError.meta?.modelName} as this would lead to a database inconsistency`,
                    },
                };
            }
        }
        if (rawError instanceof SyntaxError) {
            return {
                error: {
                    status: 400,
                    error: 'Bad Request',
                    message: rawError.message,
                },
            };
        }
        if (rawError instanceof ZodError) {
            return {
                error: responseFromZodError(rawError),
            };
        }
        if (rawError instanceof BadRequestError) {
            return {
                error: {
                    status: 400,
                    error: 'Bad Request',
                    message: rawError.message,
                }
            }
        }
        console.error(rawError);
        return {
            error: {
                status: 500,
                error: 'Internal Server Error',
                message: 'An unknown server error occured',
            },
        };
    }
}
