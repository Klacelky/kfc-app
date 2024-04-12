import Image from 'next/image';

import bannerImg from '@/public/banner_web_spring2024.svg';
import Header from '@/components/Header';

export default function Home() {
    return (
        <main className="bg-kfc-teal w-screen h-screen min-h-screen pt-20">
            <Header logo={false} />
            <Image className="max-h-[calc(100vh-5em)] mx-auto" src={bannerImg} alt="Klácelky Foosball Cup Banner" />
        </main>
    );
}
