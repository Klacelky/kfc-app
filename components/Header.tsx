'use client';

import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

import logoImg from '@/public/logo_web_100.png';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { LangContext } from '@/utils/i18n/LangContext';
import T from '@/utils/i18n/t';

function BurgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            className="text-6xl kfc-shadow p-6"
            onClick={onClick}
            aria-label="Navigation Toggle"
        >
            <span
                className={classNames('block h-1 m-1 w-6 bg-blue rounded transition-transform', {
                    'rotate-45 scale-x-[1.41] translate-y-[.5rem]': open,
                })}
            >
                {' '}
            </span>
            <span className={classNames('block h-1 m-1 w-6 bg-blue rounded transition-opacity', { 'opacity-0': open })}>
                {' '}
            </span>
            <span
                className={classNames('block h-1 m-1 w-6 bg-blue rounded transition-transform', {
                    'rotate-[-45deg] scale-x-[1.41] translate-y-[-.5rem]': open,
                })}
            >
                {' '}
            </span>
        </button>
    );
}

function NavBarItem({ href, children }: { href: string; children: ReactNode }) {
    return (
        <Link href={href}>
            <li className="text-beige kfc-shadow text-4xl leading-none font-display translate-y-2">{children}</li>
        </Link>
    );
}

export default function Header({ logo }: { logo: boolean }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { setLang, langsAvailable } = useContext(LangContext);
    const pathName = usePathname();
    useEffect(() => setMenuOpen(false), [pathName, setMenuOpen]);
    return (
        <header
            className={classNames(
                'fixed top-0 left-0 right-0 z-50 bg-teal h-20',
                { shadow: logo },
                // 'lg:h-20',
            )}
        >
            <div
                className={classNames('flex lg:container h-full m-auto p-6 items-center relative', {
                    'justify-between': logo,
                    'justify-end': !logo,
                })}
            >
                {logo ? <Image className="h-16 w-auto z-50" src={logoImg} alt="Klácelky Foosball Cup" /> : null}
                <div
                    className={classNames(
                        // "lg:hidden",
                        // 'fixed top-0 right-0 z-50',
                        'z-50',
                    )}
                >
                    <BurgerButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
                </div>
                <div className='absolute top-0 bottom-0 -right-5 left-0 bg-teal z-40' />
                <nav
                    className={classNames(
                        'absolute top-0 right-6 w-96 max-w-full',
                        'flex flex-col justify-between p-10 gap-10',
                        'transition-transform bg-teal shadow',
                        { '-translate-y-full': !menuOpen },
                        { 'translate-y-24': menuOpen },
                        // 'lg:p-0 lg:static lg:w-auto lg:translate-x-0',
                    )}
                >
                    <div className='bg-inherit rotate-45 w-6 h-6 absolute -top-3 right-7' />
                    <ul
                        className={classNames(
                            'flex flex-col gap-6 items-start flex-grow',
                            // 'lg:flex-row',
                        )}
                    >
                        <NavBarItem href="/">
                            <T sk="Domov" en="Home" />
                        </NavBarItem>
                        <NavBarItem href="/format">
                            <T sk="Formát" en="Form" />
                        </NavBarItem>
                        <NavBarItem href="/rules">
                            <T sk="Pravidlá" en="Rules" />
                        </NavBarItem>
                        <NavBarItem href="/groups">
                            <T sk="Skupiny" en="Groups" />
                        </NavBarItem>
                        <NavBarItem href="/play-off">Play-off</NavBarItem>
                        <NavBarItem href="/spectators">
                            <T sk="Pre divákov" en="Spectators" />
                        </NavBarItem>
                    </ul>
                    <ul className="flex flex-row text-4xl gap-2">
                        {langsAvailable.map(({ lang: langAvailable, emoji }) => (
                            <li
                                key={langAvailable}
                                onClick={() => setLang(langAvailable)}
                                className="cursor-pointer"
                                aria-label={`Language: ${langsAvailable}`}
                                role="button"
                            >
                                {emoji}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
