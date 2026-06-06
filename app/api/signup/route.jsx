import { hashPassword, signToken } from "@/lib/auth";
import { getUsers, saveUsers } from "@/lib/db";
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

        const users = await getUsers()
        console.log('3. Got users', users.length)

        console.log('Login email:', normalizedEmail)
        console.log('Saved emails:', users.map(u => u.email))
        if (users.find(u => u.email === normalizedEmail)) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
        }

        const hashed = await hashPassword(password)
        console.log('4. Password hashed')

        const newUser = {
            id: nanoid(),
            email,
            password: hashed,
            bookmarkedIds: []
        }
        await saveUsers(newUser)
        console.log('5. Saved users')

        const { password: _, ...safeUser } = newUser

        const token = await signToken({ id: newUser.id, email })

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