'use client';

import { ReactNode, useContext } from 'react';
import { LangContext } from './LangContext';

type Lang = 'sk' | 'en';

export type Translations = { [lang in Lang]: ReactNode };

const langs: { [lang in Lang]: RegExp } = {
    sk: /^(sk|cs)/,
    en: /^.*/,
};

export default function T(translations: Translations): ReactNode {
    const { currentLang } = useContext(LangContext);

    const userLang = (Object.keys(langs) as Lang[]).find((k) => langs[k].test(currentLang));
    return userLang && translations[userLang] ? (
        translations[userLang]
    ) : (
        <span className="bg-red text-beige">Could not find translation!</span>
    );
}
