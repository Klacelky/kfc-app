import Header from '@/components/Header';

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-kfc-beige text-kfc-blue dark:bg-kfc-blue dark:text-kfc-beige min-h-screen">
            <Header logo />
            <main className="container m-auto p-4 pt-24">{children}</main>
        </div>
    );
}
