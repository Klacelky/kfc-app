'use client';

import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

import logoImg from '@/public/logo_web_100.png';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function BurgerButton({
    open,
    onClick,
}: {
    open: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            className="text-6xl kfc-shadow"
            onClick={onClick}
            aria-label="Navigation Toggle"
        >
            <span
                className={classNames(
                    'block h-1 m-1 w-7 bg-blue rounded transition-transform',
                    {
                        'rotate-45 scale-x-[1.41] translate-y-[.5rem]': open,
                    },
                )}
            >
                {' '}
            </span>
            <span
                className={classNames(
                    'block h-1 m-1 w-7 bg-blue rounded transition-opacity',
                    { 'opacity-0': open },
                )}
            >
                {' '}
            </span>
            <span
                className={classNames(
                    'block h-1 m-1 w-7 bg-blue rounded transition-transform',
                    {
                        'rotate-[-45deg] scale-x-[1.41] translate-y-[-.5rem]':
                            open,
                    },
                )}
            >
                {' '}
            </span>
        </button>
    );
}

function NavBarItem({ href, children }: { href: string; children: ReactNode }) {
    return (
        <Link href={href}>
            <li className="text-beige kfc-shadow text-4xl leading-none font-display translate-y-2">
                {children}
            </li>
        </Link>
    );
}

export default function Header({
    logo,
    fixed,
}: {
    logo: boolean;
    fixed: boolean;
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathName = usePathname();
    useEffect(() => setMenuOpen(false), [pathName]);
    return (
        <header
            className={classNames('bg-teal md:h-20', {
                'fixed top-0 left-0 right-0 z-50 shadow h-20': fixed,
            })}
        >
            <div
                className={classNames(
                    'flex',
                    { 'justify-between': logo, 'justify-around': !logo },
                    'max-w-5xl',
                    'h-full',
                    'm-auto',
                    'px-6',
                    'items-center',
                )}
            >
                {logo ? (
                    <Image
                        className="h-16 w-auto"
                        src={logoImg}
                        alt="Klácelky Foosball Cup"
                    />
                ) : null}
                <nav
                    className={classNames(
                        { 'fixed top-0 right-0 bottom-0 w-96': fixed },
                        'flex flex-row transition-all',
                        { 'right-[-19rem]': !menuOpen },
                        'md:static md:w-auto',
                    )}
                >
                    {fixed ? (
                        <div className="m-6 md:hidden">
                            <BurgerButton
                                open={menuOpen}
                                onClick={() => setMenuOpen(!menuOpen)}
                            />
                        </div>
                    ) : null}
                    <ul className="flex flex-col gap-6 items-start bg-teal flex-grow p-10 md:flex-row md:p-0">
                        <NavBarItem href="/">Domov</NavBarItem>
                        <NavBarItem href="/format">Formát</NavBarItem>
                        <NavBarItem href="/rules">Pravidlá</NavBarItem>
                        <NavBarItem href="/spectators">Pre divákov</NavBarItem>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
