'use client';

import { ReactNode, useContext } from 'react';
import { LangContext } from './LangContext';

type Lang = 'sk' | 'en';

export type Translations = { [lang in Lang]?: ReactNode };

const langs: { [lang in Lang]: RegExp } = {
    sk: /^(sk|cs)/,
    en: /^.*/,
};

function parseTranslations(s: string): Translations {
    const translations: Translations = { sk: '', en: '' };
    let lang: Lang | undefined = undefined;
    let index = -1;
    do {
        index = s.search(/\+\+(?:sk|en):/);
        if (lang) {
            translations[lang] += (index === -1 ? s : s.substring(0, index)).trim();
        }
        if (index === -1)
            break;
        lang = s.substring(index + 2, index + 4) as Lang;
        s = s.substring(index + 5);
    } while (true);
    if (!lang) {
        return {
            sk: s,
            en: s,
        };
    }
    return translations;
}

export default function T({ children, ...rest }: { children?: string } & Translations): ReactNode {
    const { currentLang } = useContext(LangContext);

    const userLang = (Object.keys(langs) as Lang[]).find((k) => langs[k].test(currentLang));
    const translations: Translations = children ? parseTranslations(children) : rest;
    return userLang && translations[userLang] ? (
        translations[userLang]
    ) : (
        <span className="bg-red text-beige">Could not find translation!</span>
    );
}
