'use client';

export type DateTimeProps = {
    datetime: Date | undefined | null;
    type?: 'date' | 'time' | 'datetime';
    lang?: string;
};

export default function DateTime({ datetime, type, lang }: DateTimeProps) {
    if (!datetime) {
        return null;
    }

    switch (type) {
        case 'date':
            return datetime.toLocaleDateString(lang);
        case 'time':
            return datetime.toLocaleTimeString(lang);
        case 'datetime':
        case undefined:
            return datetime.toLocaleString(lang);
    }
}
