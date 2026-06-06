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
        if (!user) {
            setMarked([])
            return
        }

        const merged = media.map(m => ({
            ...m,
            isBookmarked: user?.bookmarkedIds?.includes(m.id) || false
        }))
        setMarked(merged)

    }, [user])

    const toggleBookmark = async (id) => {
        setMarked(prev => prev.map(item =>
            item.id === id ? { ...item, isBookmarked: !item.isBookmarked }
                : item
        ))

        const res = await fetch('/api/bookmark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // <-- added
            body: JSON.stringify({ id })
        })

        const data = await res.json()

        if (data.user) setUser(data.user)
    }

    const filteredMovies = !searchTerm
        ? marked
        : marked.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()))

    const value = {
        user,
        setUser,
        filteredMovies,
        searchTerm,
        setSearchTerm,
        marked,
        toggleBookmark,
        user
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}