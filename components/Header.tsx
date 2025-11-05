'use client';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useState } from 'react';

import logoImg from '@/public/logo_web_100.png';
import { LangContext } from '@/utils/client/i18n/LangContext';
import T from '@/utils/client/i18n/t';

function BurgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
    return (
        <button type="button" className="text-6xl text-kfc-blue p-4" onClick={onClick} aria-label="Navigation Toggle">
            <span
                className={classNames('block h-1 m-1 w-6 bg-kfc-blue rounded-sm transition-transform', {
                    'rotate-45 scale-x-[1.41] translate-y-[.5rem]': open,
                })}
            >
                {' '}
            </span>
            <span
                className={classNames('block h-1 m-1 w-6 bg-kfc-blue rounded-sm transition-opacity', {
                    'opacity-0': open,
                })}
            >
                {' '}
            </span>
            <span
                className={classNames('block h-1 m-1 w-6 bg-kfc-blue rounded-sm transition-transform', {
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
        <li className="text-kfc-blue text-4xl leading-none font-display translate-y-2">
            <Link href={href}>{children}</Link>
        </li>
    );
}

function NavBarSubMenu({ href, title, children }: { href?: string; title: ReactNode; children: ReactNode }) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(!!(href && pathname.startsWith(href)));
    return (
        <li className="text-kfc-blue text-4xl leading-none font-display translate-y-2">
            <button
                onClick={(event) => {
                    setMenuOpen(!menuOpen);
                    event.stopPropagation();
                }}
                className="flex gap-4 items-center"
            >
                <div>{title}</div>
                <div className="relative block h-9 w-9">
                    <span
                        className={classNames(
                            'absolute block bg-kfc-blue w-5 h-1 transition-transform top-1/4 translate-x-[0.4rem]',
                            { 'rotate-[-45deg] ': !menuOpen, 'rotate-45': menuOpen },
                        )}
                    >
                        {' '}
                    </span>
                    <span
                        className={classNames(
                            'absolute block bg-kfc-blue w-5 h-1 transition-transform top-1/4 translate-x-[-0.4rem]',
                            { 'rotate-[-45deg] ': menuOpen, 'rotate-45': !menuOpen },
                        )}
                    >
                        {' '}
                    </span>
                </div>
            </button>
            <ul
                className={classNames('flex flex-col gap-4 items-start grow pl-6 overflow-hidden transition-all', {
                    'max-h-72': menuOpen,
                    'max-h-0': !menuOpen,
                })}
                onClick={() => setMenuOpen(false)}
            >
                {children}
            </ul>
        </li>
    );
}

export default function Header({ logo }: { logo: boolean }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { setCurrentLang, langsAvailable } = useContext(LangContext);
    return (
        <header
            className={classNames(
                'fixed top-0 left-0 right-0 z-50 bg-kfc-teal h-20',
                { 'shadow-sm': logo },
                // 'lg:h-20',
            )}
        >
            <div
                className={classNames('flex lg:container h-full m-auto pl-4 items-center relative', {
                    'justify-between': logo,
                    'justify-end': !logo,
                })}
            >
                {logo && <Image className="h-16 w-auto z-50" src={logoImg} alt="Klácelky Foosball Cup" />}
                <div
                    className={classNames(
                        // "lg:hidden",
                        // 'fixed top-0 right-0 z-50',
                        'z-50',
                    )}
                >
                    <BurgerButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
                </div>
                <div className="absolute top-0 bottom-0 -right-5 left-0 bg-kfc-teal z-40" />
                <nav
                    className={classNames(
                        'absolute top-0 right-4 w-96 max-w-full',
                        'flex flex-col justify-between p-10 gap-10',
                        'transition-transform bg-kfc-teal shadow',
                        { '-translate-y-full': !menuOpen },
                        { 'translate-y-24': menuOpen },
                        // 'lg:p-0 lg:static lg:w-auto lg:translate-x-0',
                    )}
                    onClick={() => setMenuOpen(false)}
                >
                    <div className="bg-inherit rotate-45 w-[1.24rem] h-[1.24rem] absolute -top-[0.62rem] right-[0.26rem]" />
                    <ul
                        className={classNames(
                            'flex flex-col gap-6 items-start grow',
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
                        {/* <NavBarItem href="/groups"> */}
                        {/*     <T sk="Skupiny" en="Groups" /> */}
                        {/* </NavBarItem> */}
                        <NavBarItem href="/play-off">Play-off</NavBarItem>
                        <NavBarSubMenu href="/archive" title={<T sk="Archív" en="Archive" />}>
                            <NavBarItem href="/archive/autumn2024">
                                <T sk="Podzim 2024" en="Autumn 2024" />
                            </NavBarItem>
                            <NavBarItem href="/archive/spring2024">
                                <T sk="Jaro 2024" en="Spring 2024" />
                            </NavBarItem>
                            <NavBarItem href="/archive/podzim2023">
                                <T sk="Podzim 2023" en="Autumn 2023" />
                            </NavBarItem>
                        </NavBarSubMenu>
                    </ul>
                    <ul className="flex flex-row text-4xl gap-2">
                        {langsAvailable.map(({ lang: langAvailable, emoji }) => (
                            <li key={langAvailable}>
                                <button
                                    onClick={() => setCurrentLang(langAvailable)}
                                    className="cursor-pointer"
                                    type="button"
                                    aria-label={`Language: ${langAvailable}`}
                                >
                                    {emoji}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
