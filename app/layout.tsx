import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';
import 'flag-icons/css/flag-icons.min.css';
import classNames from 'classnames';
import { LangProvider } from '@/utils/i18n/LangProvider';

const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
});
const rushford = localFont({
    src: '../public/Rushfordclean-rgz89.otf',
    display: 'swap',
    variable: '--font-rushford',
});

export const metadata: Metadata = {
    title: 'Klácelky Foosball Cup',
    description: 'Klácelky Foosbal Cup - Autumn 2023',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className={classNames(nunito.variable, rushford.variable)}>
            <body className="font-sans">
                <LangProvider>{children}</LangProvider>
            </body>
        </html>
    );
}
