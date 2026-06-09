import { connectDB } from "@/lib/db"
import { hashPassword, signToken } from "@/lib/auth";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import * as z from 'zod';

const signupSchema = z.object({
    email: z.email('Invalid email').min(1, "Can't be empty"),
    password: z.string().min(6, 'Password must be 6+ characters')
})

export async function POST(req) {
    console.log('1. Signup started')
    try {
        const body = await req.json()
        const { email, password } = signupSchema.parse(body)
        const normalizedEmail = email.toLowerCase().trim()
        console.log('2. Parsed body', email)

        const db = await connectDB()
        const users = db.collection('users')

        const existingUser = await users.findOne({ email: normalizedEmail })
        console.log('3. Checked existing user')
        if (existingUser) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
        }

        const hashed = await hashPassword(password)
        console.log('4. Password hashed')

        const newUser = {
            id: nanoid(),
            email: normalizedEmail,
            password: hashed,
            bookmarkedIds: []
        }
        await users.insertOne(newUser)
        console.log('5. User inserted to Mongo')

        const { password: _, ...safeUser } = newUser

        const token = await signToken({ id: newUser.id, email: normalizedEmail })

        const res = NextResponse.json({ user: safeUser })
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