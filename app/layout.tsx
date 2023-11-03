import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Klácelky Foosball Cup',
    description: 'Klácelky Foosbal Cup - Autumn 2023',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="font-sans">{children}</body>
        </html>
    );
}
