'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { LangContext } from './LangContext';

const langOrder = [/^cs/, /^sk/, /^en/, /^.*/];

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState('en_US');

    const setCurrentLang = useCallback(
        (lang: string) => {
            window.localStorage.setItem('lang', lang);
            setLang(lang);
        },
        [setLang],
    );

    useEffect(() => {
        const savedLang = window.localStorage.getItem('lang');
        if (savedLang) {
            setLang(savedLang);
        } else {
            const langs = navigator.languages.toSorted(
                (langA, langB) =>
                    langOrder.findIndex((value) => value.test(langA)) -
                    langOrder.findIndex((value) => value.test(langB)),
            );
            if (langs && langs.length >= 1) {
                setLang(langs[0]);
            }
        }
    }, [setLang]);

    return (
        <LangContext.Provider
            value={{
                currentLang: lang,
                setCurrentLang,
                langsAvailable: [
                    { lang: 'sk', emoji: <span className="fi fi-sk"></span> },
                    { lang: 'en', emoji: <span className="fi fi-gb"></span> },
                ],
            }}
        >
            {children}
        </LangContext.Provider>
    );
}
