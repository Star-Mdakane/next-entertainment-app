import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import User from '@/models/User'


export async function POST(req) {

    try {
        await connectDB()

        const { key } = await req.json()
        if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })


        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })


        const payload = await verifyToken(token)
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

        const user = await User.findById(payload.id)
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

        const bookmarkedIds = user.bookmarkedIds || []
        const isBookmarked = bookmarkedIds.includes(key)

        if (isBookmarked) {
            user.bookmarkedIds = bookmarkedIds.filter(id => id !== key)
        } else {
            user.bookmarkedIds = [...bookmarkedIds, key]
        }

        await user.save()

        return NextResponse.json({
            success: true,
            isBookmarked: !isBookmarked,
            user: { bookmarkedIds: user.bookmarkedIds }
        })
    } catch (err) {
        console.log('Bookmark API error:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }

}