import { connectDB } from "@/lib/db"
import { hashPassword, signToken } from "@/lib/auth";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import * as z from 'zod';
import User from "@/models/User"

const signupSchema = z.object({
    email: z.email('Invalid email').min(1, "Can't be empty"),
    password: z.string().min(6, 'Password must be 6+ characters')
})

export async function POST(req) {
    console.log('1. Signup started')
    try {
        await connectDB()
        const body = await req.json()
        const { email, password } = signupSchema.parse(body)
        const normalizedEmail = email.toLowerCase().trim()
        console.log('2. Parsed body', email)

        const existingUser = await User.findOne({ email: normalizedEmail })
        console.log('3. Checked existing user')
        if (existingUser) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
        }

        const hashed = await hashPassword(password)
        console.log('4. Password hashed')

        const newUser = await User.create(
            {
                email: normalizedEmail,
                password: hashed,
                bookmarkedIds: []
            }
        )

        const { password: _, ...safeUser } = newUser.toObject()

        const token = await signToken({ id: newUser._id.toString(), email: normalizedEmail })

        const res = NextResponse.json({
            ok: true,
            message: "Entering a world of wonders!",
            user: { ...safeUser, id: newUser._id.toString() }
        })
        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        })

        return res
    } catch (err) {
        if (err.name === 'ZodError') {
            console.log('Signup error', err);
            const errors = err.flatten().fieldErrors
            return NextResponse.json({ errors }, { status: 400 })
        }
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}