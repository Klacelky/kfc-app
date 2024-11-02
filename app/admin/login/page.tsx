import { redirect } from 'next/navigation';

import LoginForm from './LoginForm';

import Alert from '@/components/Alert';
import { isLoggedIn } from '@/utils/server/auth';
import { PageParams } from '@/utils/server/pages';

export type RouteParams = {};

export default async function AdminLoginPage({ searchParams }: PageParams<RouteParams>) {
    if (await isLoggedIn()) {
        redirect('/admin');
    }
    return (
        <>
            {searchParams.error && <Alert>{searchParams.error}</Alert>}
            <LoginForm />;
        </>
    );
}
