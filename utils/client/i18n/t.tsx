'use client';

import { ReactNode, useContext } from 'react';

import { LangContext } from './LangContext';
import { getUserLang, Lang } from './common';

export type Translations = { [lang in Lang]?: ReactNode };

function parseTranslations(s: string): Translations {
    const translations: Translations = { sk: '', en: '' };
    let lang: Lang | undefined = undefined;
    let index = -1;
    do {
        index = s.search(/\+\+(?:sk|en):/);
        if (lang) {
            translations[lang] += (index === -1 ? s : s.substring(0, index)).trim();
        }
        if (index === -1) {
            break;
        }
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

    const userLang = getUserLang(currentLang);

    const translations: Translations = children ? parseTranslations(children) : rest;
    if (!Object.keys(translations)) {
        console.warn('Non translated string', children);
        return children;
    }
    return userLang && translations[userLang] ? (
        translations[userLang]
    ) : (
        <span className="bg-kfc-red text-kfc-beige">Could not find translation!</span>
    );
}
