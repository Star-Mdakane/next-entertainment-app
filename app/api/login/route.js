import { signToken, verifyPassword } from "@/lib/auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"
import * as z from 'zod';
import User from "@/models/User"

const loginSchema = z.object({
    email: z.email('Invalid email').min(1, "Can't be empty"),
    password: z.string().min(1, "Can't be empty")
})

export async function POST(req) {
    try {
        await connectDB()

        const body = await req.json()
        const { email, password } = loginSchema.parse(body)
        const normalizedEmail = email.toLowerCase().trim()

        console.log('Login email:', normalizedEmail);

        const user = await User.findOne({ email: normalizedEmail }).lean()


        if (!user || !(await verifyPassword(password, user.password))) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const { password: _, _id, ...safeUser } = user

        const token = await signToken({ id: user._id.toString(), email: user.email })
        const res = NextResponse.json({ user: { ...safeUser, id: _id.toString() } })
        res.cookies.set('token', token,
            {
                httpOnly: true,
                secure: false,
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