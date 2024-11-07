type EmptyType = '' | 'null' | 'undefined';

type RegisterOptionsOptions =
    | { date?: false; number?: false; empty?: EmptyType }
    | { date: true; number?: false; empty?: EmptyType | Date }
    | { date?: false; number: true; empty?: EmptyType | number };

export function convertEmpty<T, TValue = EmptyType | T>(value: TValue): '' | null | undefined | T {
    switch (value) {
        case 'null':
            return null;
        case 'undefined':
            return undefined;
        case '':
            return '';
        default:
            return value as unknown as T;
    }
}

type RegisterOptionsReturn = { setValueAs?: (value: any) => any };

export function registerOptions({ empty, date, number }: RegisterOptionsOptions): RegisterOptionsReturn {
    if (date) {
        return {
            setValueAs: (v) => {
                return v ? new Date(v) : convertEmpty(empty);
            },
        };
    }
    if (number) {
        return {
            setValueAs: (v) => {
                return v ? +v : convertEmpty(empty);
            },
        };
    }
    if (empty) {
        return { setValueAs: (v) => v || convertEmpty(empty) };
    }
    return {};
}
