import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Movie from '@/models/Movie'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
    await connectDB()

    const user = await getCurrentUser()
    const movies = await Movie.find({ category: 'Movie' }).lean()

    return NextResponse.json({
        movies,
        bookmarkedIds: user?.bookmarkedIds || []
    })
}