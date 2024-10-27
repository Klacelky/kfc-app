'use client';
import { useContext } from 'react';
import { LangContext } from './LangContext';
import { getUserLang } from './common';

export type TDateTimeProps = {
    datetime: Date;
    type: 'date' | 'time' | 'datetime';
};

export default function TDateTime({ datetime, type }: TDateTimeProps) {
    const { currentLang } = useContext(LangContext);
    const userLang = getUserLang(currentLang);

    switch (type) {
        case 'date':
            return datetime.toLocaleDateString(userLang);
        case 'time':
            return datetime.toLocaleTimeString(userLang);
        case 'datetime':
            return datetime.toLocaleString(userLang);
    }
}
