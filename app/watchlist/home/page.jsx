'use client'

import Media from "@/components/Media";
import SearchBar from "@/components/SearchBar";
import Trending from "@/components/Trending";
import { Suspense } from 'react';
import Loading from './loading';

export default function HomePage() {


    return (
        <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8 lg:mt-16 overflow-hidden">
            <SearchBar />
            <Trending />
            <Suspense fallback={<Loading />}>
                <Media />
            </Suspense>
        </div>
    )
}