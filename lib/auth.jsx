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
        console.log('Verifying with secret:', SECRET?.slice(0, 5))
        return jwt.verify(token, SECRET)
    } catch (err) {
        console.log('Verify failed FULL:', err.name, err.message)
        return null
    }
}


export async function getCurrentUser() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        if (!token) {
            console.log('No token found');
            return null
        }

        const decoded = jwt.verify(token, SECRET)
        console.log('User decoded:', decoded.email);
        return decoded
    } catch (err) {
        console.log('getCurrentUser error:', err.message)
        return null
    }

} 