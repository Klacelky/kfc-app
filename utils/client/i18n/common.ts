export type Lang = 'sk' | 'en';

const langs: { [lang in Lang]: RegExp } = {
    sk: /^(sk|cs)/,
    en: /^.*/,
};

export function getUserLang(currentLang: string): Lang | undefined {
    return (Object.keys(langs) as Lang[]).find((k) => langs[k].test(currentLang));
}
