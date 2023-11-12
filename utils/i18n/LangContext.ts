import { createContext } from 'react';

export const LangContext = createContext<{
    currentLang: string;
    setCurrentLang: (lang: string) => void;
    langsAvailable: { lang: string; emoji: string }[];
}>({ currentLang: 'sk', setCurrentLang: () => {}, langsAvailable: [] });
