import { createContext } from 'react';

export const LangContext = createContext<{
    lang: string;
    setLang: (lang: string) => void;
    langsAvailable: { lang: string; emoji: string }[];
}>({ lang: 'sk', setLang: () => {}, langsAvailable: [] });
