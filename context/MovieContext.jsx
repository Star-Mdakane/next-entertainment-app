'use client'

import { createContext, useContext, useEffect, useState } from "react";
import media from '../public/data.json'


export const MovieContext = createContext()

export const useMovie = () => {
    const ctx = useContext(MovieContext)
    if (!ctx) throw new Error("useMovie must be inside MovieProvider");
    return ctx
}

export const MovieProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [marked, setMarked] = useState([])

    useEffect(() => {
        fetch('/api/me')
            .then(r => r.json())
            .then(data => setUser(data.user || null))
            .catch(() => setUser(null))
    }, [])

    useEffect(() => {
        setMarked(user?.bookmarkedIds || [])
    }, [user])

    const toggleBookmark = async (key) => {
        setMarked(prev =>
            prev.includes(key) ? prev.filter(b => b !== key) : [...prev, key]
        )

        try {
            const res = await fetch('/api/bookmark', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key })
            })


            const data = await res.json()
            if (data.user) setUser(data.user)

        } catch (err) {
            console.log(err);
            setMarked(prev =>
                prev.includes(key) ? prev.filter(b => b !== key) : [...prev, key]
            )
        }



    }

    const filteredMovies = !searchTerm
        ? media.filter(m => m && m.title)
        : media.filter(m =>
            m && m.title && m.title.toLowerCase().includes(searchTerm.toLowerCase()))

    const value = {
        user,
        filteredMovies,
        media,
        searchTerm,
        setSearchTerm,
        marked,
        toggleBookmark
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}