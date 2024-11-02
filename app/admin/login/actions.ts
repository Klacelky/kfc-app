'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { LoginActionProps } from './types';

import { AuthLoginDtoSchema } from '@/dtos/auth';
import { loginAdmin } from '@/services/auth';
import { Return } from '@/utils/common';
import { handleError } from '@/utils/server/common';

export async function loginAction({ data: rawData }: LoginActionProps): Promise<Return | never> {
    const { data: jwt, error } = await handleError(
        async () => await loginAdmin(await AuthLoginDtoSchema.parseAsync(rawData)),
    );
    if (error) {
        return { error: error };
    }
    if (jwt === null) {
        return {
            error: {
                status: 401,
                error: 'Unauthorized',
                message: 'Username or password is incorrect',
            },
        };
    }
    const cookieStore = cookies();
    cookieStore.set('jwt', jwt);
    redirect('/admin');
}
