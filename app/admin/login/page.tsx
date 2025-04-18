import { redirect } from 'next/navigation';

import LoginForm from './LoginForm';

import Alert from '@/components/Alert';
import { PageProps } from '@/utils/common';
import { isLoggedIn } from '@/utils/server/auth';

export type RouteParams = {};

export default async function AdminLoginPage({ searchParams }: PageProps<RouteParams>) {
    const { error } = await searchParams;
    if (await isLoggedIn()) {
        redirect('/admin');
    }
    return (
        <>
            {error && <Alert>{error}</Alert>}
            <LoginForm />;
        </>
    );
}
