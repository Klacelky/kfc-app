'use client';

import { Bars3Icon, ChartBarIcon, TrophyIcon, UserGroupIcon, UserIcon, UsersIcon } from '@heroicons/react/16/solid';
import classNames from 'classnames';
import Link from 'next/link';
import { ReactNode, useState } from 'react';

import Button from '@/components/admin/Button';
import { TournamentGetDto } from '@/dtos/tournament';

function NavItem({ children, href }: { children: ReactNode; href: string }) {
    return (
        <Link href={href} className="flex flex-row gap-2 items-center text-lg my-2">
            {children}
        </Link>
    );
}

function NavSection({ children, title }: { children: ReactNode; title?: ReactNode }) {
    return (
        <div className="border-b-2 border-b-slate-400 p-4">
            {title && <h2 className="text-xl m-0 pb-4">{title}</h2>}
            {children}
        </div>
    );
}

export type AdminNavProps = {
    tournaments: TournamentGetDto[];
};

export function AdminNav({ tournaments }: AdminNavProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="flex flex-row items-center h-16 bg-slate-500 text-white fixed top-0 left-0 w-full md:px-6 z-10">
                <Button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    <Bars3Icon className="w-10" />
                </Button>
                <Link href="/admin">
                    <h1 className="translate-y-1">KFC Admin</h1>
                </Link>
            </header>

            <aside
                className={classNames(
                    'md:w-72 w-full fixed top-16 md:left-0 h-[100vh] bg-slate-500 text-white p-6 z-10 left transition-all',
                    {
                        'left-0': menuOpen,
                        'left-[-100vw]': !menuOpen,
                    },
                )}
            >
                <nav onClick={() => setMenuOpen(false)}>
                    <NavSection>
                        <NavItem href="/admin/players">
                            <UserIcon className="w-7" />
                            Players
                        </NavItem>
                    </NavSection>
                    {tournaments.map(({ id, slug }) => (
                        <NavSection title={slug} key={id}>
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
                            <NavItem href={`/admin/tournaments/${id}/stats`}>
                                <ChartBarIcon className="w-7" />
                                Stats
                            </NavItem>
                        </NavSection>
                    ))}
                </nav>
            </aside>
        </>
    );
}
