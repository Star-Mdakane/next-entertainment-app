'use client'

import React from 'react'
import MediaItem from './MediaItem'
import { useMovie } from '@/context/MovieContext'

const Movies = () => {
    const { searchTerm, filteredMovies = [] } = useMovie();

    const moviesOnly = filteredMovies.filter(
        mv => mv?.category?.toLowerCase() === 'movie'
    )

    if (!filteredMovies.length) return null



    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-[20px] md:text-[32px] text-white leading-[125%] tracking-[-0.3px] font-light">
                {searchTerm ? `Found ${moviesOnly.length} results for '${searchTerm}'` : 'Movies'}
            </h2>
            <div className='w-full grid grid-cols-[repeat(2,minmax(164px,220px))] md:grid-cols-[repeat(3,minmax(220px,250px))] lg:grid-cols-[repeat(4,minmax(auto,280px))] gap-4 md:gap-6 justify-center'>
                {moviesOnly.map(m => (
                    <div key={m.id ?? m._id ?? m.title + m.year}>
                        <MediaItem media={m} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Movies