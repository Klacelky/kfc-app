import Image from 'next/image';

import bannerImg from '@/public/banner_web.svg';
import Header from '@/components/Header';

export default function Home() {
    return (
        <main className="bg-teal w-screen h-screen overflow-hidden min-h-screen">
            <Image
                className="max-h-[calc(100vh-5em)] mx-auto"
                src={bannerImg}
                alt="Klácelky Foosball Cup Banner"
            />
            <Header logo={false} fixed={false} />
        </main>
    );
}
