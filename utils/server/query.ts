import { NextRequest } from 'next/server';

export function getQueryObject(request: NextRequest): { [key: string]: string | string[] } {
    const query: { [key: string]: string | string[] } = {};
    request.nextUrl.searchParams.forEach((value, key) => {
        if (query[key] !== undefined) {
            const oldValue = query[key];
            if (Array.isArray(oldValue)) {
                oldValue.push(value);
            } else {
                query[key] = [oldValue, value];
            }
        } else {
            query[key] = value;
        }
    });
    return query;
}
