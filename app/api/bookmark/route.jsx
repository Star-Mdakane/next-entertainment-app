import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { getUsers, saveUsers } from '@/lib/db'

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

        const users = await getUsers()
        const userIndex = users.findIndex(u => u.id === payload.id)

        if (userIndex === -1) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const user = users[userIndex]
        const bookmarkedIds = user.bookmarkedIds || []

        const isBookmarked = bookmarkedIds.includes(key)
        const updateIds = isBookmarked
            ? bookmarkedIds.filter(b => b !== key)
            : [...bookmarkedIds, key]

        user.bookmarkedIds = updateIds
        users[userIndex] = user

        await saveUsers(users)

        return NextResponse.json({
            success: true, user: { bookmarkedIds: updateIds }
        })
    } catch (e) {
        console.log('Bookmark API error:', e, 'Stack:', e.stack)
        return NextResponse.json({ error: e.message }, { status: 400 })
    }

}