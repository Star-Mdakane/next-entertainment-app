'use client'

import { createContext, useContext, useEffect, useState } from "react";
import media from '../public/data.json'
import { nanoid } from "nanoid";

export const MovieContext = createContext()

export const useMovie = () => {
    const ctx = useContext(MovieContext)
    if (!ctx) throw new Error("useMovie must be inside MovieProvider");
    return ctx
}

export const MovieProvider = ({ children }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [marked, setMarked] = useState(() =>
        media.map(item => ({ ...item, id: nanoid(), isBookmarked: false }))
    )

    const [filteredMovies, setFilteredMovies] = useState(marked)

    const toggleBookmark = (id) => {
        setMarked(prev => prev.map(item =>
            item.id === id ? { ...item, isBookmarked: !item.isBookmarked }
                : item
        ))
    }


    useEffect(() => {
        if (!searchTerm) {
            setFilteredMovies(marked)
            return
        }

        const results = marked.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredMovies(results)
    }, [marked, searchTerm])



    const value = {
        filteredMovies,
        searchTerm,
        setSearchTerm,
        marked,
        toggleBookmark
    }

    console.log(media);

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}