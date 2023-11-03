import Header from '@/components/Header';

export default function PageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-beige text-blue dark:bg-blue dark:text-beige min-h-screen">
            <Header logo fixed />
            <main className="max-w-5xl m-auto p-4 pt-24">{children}</main>
        </div>
    );
}
