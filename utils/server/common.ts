import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';

export interface ErrorResponse {
    status: number;
    error: string;
    message: string;
}

export interface ConflictErrorResponse extends ErrorResponse {
    target?: any;
}

export interface ZodErrorResponse<T> extends ErrorResponse {
    issues: { [Field in keyof T | string]: string[] | undefined };
}

export interface Return<T> {
    data?: T;
    error?: ErrorResponse | ConflictErrorResponse | ZodErrorResponse<T>;
    rawError?: Error | any;
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
                    rawError,
                };
            }
            if (rawError.code == 'P2018') {
                return {
                    error: {
                        status: 404,
                        error: 'Not Found',
                        message: 'Requested child entity was not found or is not accessible',
                    },
                    rawError,
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
                    rawError,
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
                rawError,
            };
        }
        if (rawError instanceof ZodError) {
            return {
                error: {
                    status: 400,
                    error: 'Bad Request',
                    message: 'Request body is invalid',
                    issues: rawError.flatten().fieldErrors as any,
                },
                rawError,
            };
        }
        console.error(rawError);
        return {
            error: {
                status: 500,
                error: 'Internal Server Error',
                message: 'An unknown server error occured',
            },
            rawError,
        };
    }
}
