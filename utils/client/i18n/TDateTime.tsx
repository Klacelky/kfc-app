'use client';
import { useContext } from 'react';

import { LangContext } from './LangContext';
import { getUserLang } from './common';

import DateTime, { DateTimeProps } from '@/components/DateTime';

export type TDateTimeProps = Omit<DateTimeProps, 'lang'>;

export default function TDateTime({ datetime, type }: TDateTimeProps) {
    const { currentLang } = useContext(LangContext);
    const userLang = getUserLang(currentLang);

    return <DateTime datetime={datetime} type={type} lang={userLang} />;
}
