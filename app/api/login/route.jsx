import { signToken, verifyPassword } from "@/lib/auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"
import * as z from 'zod';

const loginSchema = z.object({
    email: z.email('Invalid email').min(1, "Can't be empty"),
    password: z.string().min(1, "Can't be empty")
})

export async function POST(req) {
    try {
        const body = await req.json()
        const { email, password } = loginSchema.parse(body)
        const normalizedEmail = email.toLowerCase().trim()

        const db = await connectDB()
        const users = db.collection('users')

        const user = await users.findOne({ email: normalizedEmail })

        console.log('Login email:', normalizedEmail);

        if (!user || !(await verifyPassword(password, user.password))) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const { password: _, ...safeUser } = user


        const token = await signToken({ id: user.id, email: user.email })
        const res = NextResponse.json({ user: safeUser })
        res.cookies.set('token', token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })

        return res
    } catch (err) {
        console.error('LOGIN CRASH:', err)
        if (err.name === 'ZodError') {
            const errors = err.flatten().fieldErrors
            return NextResponse.json({ errors }, { status: 400 })
        }
        console.error('Login error:', err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}