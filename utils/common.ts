import { z } from 'zod';

import { BaseDtoSchema, BaseGetDto } from '@/dtos/base';

export function callOptional<TReturn>(fn?: () => TReturn): TReturn | {} {
    return fn ? fn() : {};
}

export function getObjectsIds(objects: BaseGetDto[]): z.infer<typeof BaseDtoSchema.shape.id>[] {
    return objects.map(({ id }) => id);
}

export type ErrorResponse = {
    status: number;
    error: string;
    message: string;
};

export type ConflictErrorResponse = ErrorResponse & {
    target?: any;
};

export type ZodErrorResponse<T> = ErrorResponse & {
    issues: { [Field in keyof T | string]: string[] | undefined };
};

export type Return<T = void> =
    | {
          data: T;
          error?: undefined;
      }
    | {
          data?: undefined;
          error: ErrorResponse | ConflictErrorResponse | ZodErrorResponse<T>;
      };

export type RouteProps<TParams = {}> = {
    params: Promise<TParams>;
};

export type PageProps<TParams = {}> = RouteProps<TParams> & {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function formatDuration(seconds: number): string {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60

    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    let result = `${seconds} s`;
    if (hours > 0 || minutes > 0) {
        result = `${minutes} m ${result}`;
    }
    if (hours > 0) {
        result = `${hours} h ${result}`;
    }
    return result;
}
