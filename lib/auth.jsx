import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'

export const hashPassword = async (pwd) => bcrypt.hash(pwd, 10)

export const verifyPassword = async (pwd, hash) => bcrypt.compare(pwd, hash)

export const signToken = async (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export async function verifyToken(token) {
    try {
        console.log('Verifying with secret:', process.env.JWT_SECRET?.slice(0, 5))
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        console.log('Verify failed:', err.message) // will tell us "invalid signature" or "jwt expired"
        return null
    }
}


export async function getCurrentUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return null
    return verifyToken(token)
} 