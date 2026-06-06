import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { getUsers, saveUsers } from '@/lib/db'

export async function POST(req) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { id } = await req.json()
    if (!id) {
        return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const users = await getUsers()
    const userIndex = users.findIndex(u => u.id === payload.id)

    if (userIndex === -1) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = users[userIndex]
    const bookmarkedIds = user.bookmarkedIds || []

    const isBookmarked = bookmarkedIds.includes(id)
    const updateIds = isBookmarked
        ? bookmarkedIds.filter(b => b !== id)
        : [...bookmarkedIds, id]

    users[userIndex] = { ...user, bookmarkedIds: updateIds }
    await saveUsers(users)

    const { password: _, ...safeUser } = users[userIndex]
    return NextResponse.json({
        success: true,
        isBookmarked: !isBookmarked,
        user: safeUser
    })
}