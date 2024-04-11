import { listTournaments } from '@/services/tournaments';
import { handleError } from '@/utils/server/common';
import { TrophyIcon, UserGroupIcon, UserIcon, UsersIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { ReactNode } from 'react';

export const dynamic = 'force-dynamic';

export function NavItem({ children, href }: { children: ReactNode; href: string }) {
    return (
        <Link href={href} className="flex flex-row gap-2 items-center text-lg my-2">
            {children}
        </Link>
    );
}

export function NavSection({ children, title }: { children: ReactNode; title?: ReactNode }) {
    return (
        <div className="border-b-2 border-b-slate-400 p-4">
            {title ? <h2 className='text-3xl mb-6'>{title}</h2> : null}
            {children}
        </div>
    );
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const { data: tournaments } = await handleError(() => listTournaments());
    return (
        <div>
            <aside className="w-72 fixed top-0 left-0 h-[100vh] bg-slate-500 text-white p-6">
                <div>
                    <Link href="/admin">
                        <h1>KFC Admin</h1>
                    </Link>
                </div>
                <nav>
                    <NavSection>
                        <NavItem href="/admin/players">
                            <UserIcon className="w-7" />
                            Players
                        </NavItem>
                    </NavSection>
                    {tournaments?.map(({ name, id }) => (
                        <NavSection title={name} key={id}>
                            <NavItem href={`/admin/tournaments/${id}/teams`}>
                                <UsersIcon className="w-7" />
                                Teams
                            </NavItem>
                            <NavItem href={`/admin/tournaments/${id}/groups`}>
                                <UserGroupIcon className="w-7" />
                                Groups
                            </NavItem>
                            <NavItem href={`/admin/tournaments/${id}/matches`}>
                                <TrophyIcon className="w-7" />
                                Matches
                            </NavItem>
                        </NavSection>
                    ))}
                </nav>
            </aside>
            <main className="ml-72 p-6">{children}</main>
        </div>
    );
}
