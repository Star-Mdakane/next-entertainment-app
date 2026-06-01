'use client'

import { useMovie } from "@/context/MovieContext"
import MediaItem from "./MediaItem"

const Series = () => {

    const { searchTerm, filteredMovies } = useMovie();

    const series = filteredMovies.filter(mv => mv.category.toLowerCase() === 'tv series')


    return (
        <div className="flex flex-col  gap-6">
            <h2 className="text-[20px] md:text-[32px] text-white leading-[125%] tracking-[-0.3px] font-light">
                {searchTerm ? `Found ${filteredMovies.length} results for '${searchTerm}'` : 'TV Series'}
            </h2>
            <div className="w-full grid grid-cols-[repeat(2,minmax(164px,220px))] md:grid-cols-[repeat(3,minmax(220px,250px))] lg:grid-cols-[repeat(4,minmax(auto,280px))] gap-4 md:gap-6 justify-center">
                {series.map(m => (
                    <div key={m.title}>
                        <MediaItem media={m} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Series