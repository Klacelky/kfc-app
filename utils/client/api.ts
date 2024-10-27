import axios, { AxiosError, AxiosResponse } from 'axios';
import useSWR, { SWRResponse } from 'swr';
import { ZodSchema, z } from 'zod';

import { ErrorResponse } from '../server/common';

import { AuthAdmin } from '@/dtos/auth';
import { TeamColorEnum } from '@/dtos/match';

type X<T, D> = {
    response?: AxiosResponse<T, D>;
    error?: ErrorResponse;
}

export function loadingButton(setState: (state: boolean) => void, handler: () => Promise<void>): () => Promise<void> {
    return async () => {
        setState(true);
        try {
            await handler();
        } catch (error) {}
        setState(false);
    };
}

export function useAuthCookie(): { data?: AuthAdmin; error?: AxiosError } {
    const { data, error } = useSWR<AuthAdmin, AxiosError>('/api/auth', apiFetch);
    return { data, error };
}

export function convertDate(date: Date | string | undefined | null): string {
    function d(n: number): string {
        return n.toLocaleString('en', { minimumIntegerDigits: 2, useGrouping: false });
    }
    if (!date) {
        return '';
    }
    if (!(date instanceof Date)) {
        return date;
    }
    return `${d(date.getFullYear())}-${d(date.getMonth())}-${d(date.getDate())}T${d(date.getHours())}:${d(date.getMinutes())}:${d(date.getSeconds())}`;
}

export function oppositeColor(color: TeamColorEnum): TeamColorEnum {
    if (color === 'BLUE') {
        return 'WHITE';
    }
    return 'BLUE';
}

export const api = axios.create({ withCredentials: true });

export const apiFetch = (url: any) => api.get(url).then((res) => res.data);

export function useSWRSchema<TSchema extends ZodSchema>(
    key: any,
    schema: TSchema,
): SWRResponse<z.infer<typeof schema>, AxiosError> {
    const { data, ...rest } = useSWR<z.infer<typeof schema>, AxiosError>(key, apiFetch);
    const parsedData = schema.safeParse(data);
    return {
        ...rest,
        data: parsedData.success ? parsedData.data : undefined,
    };
}

export async function handleApiCall<T = any, D = any>(fn: () => Promise<AxiosResponse<T, D>>): Promise<X<T, D>> {
    try {
        const response = await fn();
        return { response };
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                error: (error.response?.data as ErrorResponse) || {
                    error: 'Unknown error',
                    message: error.message,
                    status: error.status,
                },
            };
        }
        return {
            error: { error: 'Unknown error', message: 'An unknown error has occured', status: 500 },
        };
    }
}

export function getErrorMessage(error: Error | AxiosError | any): string {
    if (error instanceof AxiosError && (error.response?.data?.message || error.response?.data?.error)) {
        return error.response.data.message || error.response.data.error;
    }
    if (error instanceof Error) {
        return error.message || 'Unknown error';
    }
    return 'Unknown error';
}
