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
    const { lang } = useContext(LangContext);

    const currentLang = (Object.keys(langs) as Lang[]).find((k) => langs[k].test(lang));
    return currentLang && translations[currentLang] ? (
        translations[currentLang]
    ) : (
        <span className="bg-red text-beige">Could not find translation!</span>
    );
}
