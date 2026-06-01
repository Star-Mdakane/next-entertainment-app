'use client'

import { createContext, useContext, useEffect, useState } from "react";

export const MovieContext = createContext()

export const useMovie = () => {
    const ctx = useContext(MovieContext)
    if (!ctx) throw new Error("useMovie must be inside MovieProvider");
    return ctx
}

export const MovieProvider = ({ children }) => {

    const [media, setMedia] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const loadData = async () => {
            try {
                const res = await fetch(`/data.json`)
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setMedia(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    const value = { media, loading }

    console.log(media);

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}