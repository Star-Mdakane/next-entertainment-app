'use client'

import { useMovie } from '@/context/MovieContext'
import TrendingItem from './TrendingItem'

const Trending = () => {

    const { media } = useMovie();

    const trending = media.filter(mv => mv.isTrending === true)


    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-[20px] md:text-[32px] text-white leading-[125%] tracking-[-0.3px] font-light">Trending</h2>
            <div className='w-full overflow-x-auto scroll-smooth scrollbar-none h-35 md:h-58 flex gap-4 md:gap-10 flex-nowrap'>
                {trending.map(m => (
                    <TrendingItem key={m.title} media={m} />
                ))}
            </div>
        </div>
    )
}

export default Trending