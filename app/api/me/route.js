import { NextResponse } from 'next/server'
import { connectDB } from "@/lib/db"
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import User from "@/models/User"


export async function GET() {
    try {
        await connectDB()

        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const payload = await verifyToken(token)
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        const user = await User.findById(payload.id).select('-password -__v').lean()

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json({ user: { ...user, id: user._id.toString() } })
    } catch (err) {
        console.error('ME API error:', err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}