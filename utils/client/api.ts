import axios, { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '../server/common';
import { AuthAdmin } from '@/dtos/auth';
import useSWR from 'swr';

interface X<T, D> {
    response?: AxiosResponse<T, D>;
    error?: ErrorResponse;
}

export function useAuthCookie(): { data?: AuthAdmin; error?: AxiosError } {
    const { data, error } = useSWR<AuthAdmin, AxiosError>('/api/auth', apiFetch);
    return { data, error };
}

export const api = axios.create({ withCredentials: true });

export const apiFetch = (url: any) => api.get(url).then((res) => res.data);

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

export function getErrorMessage(error: Error | AxiosError): string {
    if (error instanceof AxiosError && (error.response?.data?.message || error.response?.data?.error)) {
        return error.response.data.message || error.response.data.error;
    }
    if (error instanceof Error) {
        return error.message || 'Unknown error';
    }
    return 'Unknown error';
}
