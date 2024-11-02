import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { AdminNav } from './AdminNav';

import Alert from '@/components/Alert';
import { listTournaments } from '@/services/tournaments';
import { isLoggedIn } from '@/utils/server/auth';
import { handleError } from '@/utils/server/common';

export default async function AdminLayout({ children }: { children: ReactNode }) {
    if (!(await isLoggedIn())) {
        return redirect('/admin/login?error=401');
    }

    const { data: tournaments, error } = await handleError(listTournaments);

    if (error) {
        return <Alert>Failed to load tournaments: {error.message}</Alert>;
    }

    return (
        <div>
            <AdminNav tournaments={tournaments} />
            <main className="md:ml-72 p-6 mt-16">{children}</main>
        </div>
    );
}
