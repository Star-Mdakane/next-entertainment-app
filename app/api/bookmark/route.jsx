import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { connectDB } from '@/lib/db'


export async function POST(req) {

    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        const { key } = await req.json()

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })

        const payload = await verifyToken(token)
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        const db = await connectDB()
        const users = db.collection('users')

        const user = await users.findOne({ id: payload.id })
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const bookmarkedIds = user.bookmarkedIds || []

        const isBookmarked = bookmarkedIds.includes(key)

        const updateOp = isBookmarked
            ? { $pull: { bookmarkedIds: key } }
            : { $push: { bookmarkedIds: key } }

        await users.updateOne({ id: payload.id }, updateOp)

        const updateUser = await users.findOne({ id: payload.id })

        return NextResponse.json({
            success: true,
            user: { bookmarkedIds: updateUser.bookmarkedIds || [] }
        })
    } catch (e) {
        console.log('Bookmark API error:', e)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }

}