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
