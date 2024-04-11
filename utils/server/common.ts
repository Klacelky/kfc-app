import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError, ZodIssue } from 'zod';

export interface ErrorResponse {
    status: number;
    error: string;
    message: string;
}

export interface ConflictErrorResponse extends ErrorResponse {
    target?: any;
}

export interface ZodErrorResponse extends ErrorResponse {
    issues: ZodIssue[];
}

export interface Return<T> {
    data?: T;
    error?: ErrorResponse | ConflictErrorResponse | ZodErrorResponse;
    rawError?: Error | any;
}

export async function handleError<T>(fn: (...args: any) => Promise<T>, ...args: any): Promise<Return<T>> {
    try {
        return { data: await fn(args) };
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
                    issues: rawError.issues,
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
