import { cookies } from 'next/headers';

import { AuthAdmin } from '@/dtos/auth';
import { verifyAdmin } from '@/services/auth';

export type ActionAuthOptions = {
    requireAuth?: boolean;
    requireSu?: boolean;
};

export async function getAuth({
    requireAuth,
    requireSu,
}: ActionAuthOptions): Promise<AuthAdmin | 'nologin' | 'nosu' | undefined> {
    if (requireAuth) {
        const cookieStore = cookies();
        const jwt = cookieStore.get('jwt');
        if (!jwt) {
            return 'nologin';
        }
        try {
            const auth = await verifyAdmin(jwt.value);
            if (requireSu && !auth.su) {
                return 'nosu';
            }
            return auth;
        } catch (error) {
            return 'nologin';
        }
    }
}

export async function isLoggedIn(): Promise<boolean> {
    return (await getAuth({ requireAuth: true })) !== undefined;
}