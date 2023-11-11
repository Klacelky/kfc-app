'use client';

import { ReactNode, useEffect, useState } from 'react';
import { LangContext } from './LangContext';

const langOrder = [/^cs/, /^sk/, /^en/, /^.*/];

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState('en_US');

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
                lang,
                setLang,
                langsAvailable: [
                    { lang: 'sk', emoji: '🇸🇰' },
                    { lang: 'en', emoji: '🇬🇧' },
                ],
            }}
        >
            {children}
        </LangContext.Provider>
    );
}