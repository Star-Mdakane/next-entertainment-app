import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { connectDB } from '@/lib/db'

export async function GET() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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

    const { password, ...safeUser } = user
    return NextResponse.json({ user: safeUser })
}