import { ReactNode, createContext } from 'react';

export const LangContext = createContext<{
    currentLang: string;
    setCurrentLang: (lang: string) => void;
    langsAvailable: { lang: string; emoji: ReactNode }[];
}>({ currentLang: 'sk', setCurrentLang: () => {}, langsAvailable: [] });
