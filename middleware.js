export const runtime = 'nodejs'

import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(req) {
    const token = req.cookies.get('token')?.value
    const path = req.nextUrl.pathname

    console.log('Middleware:', path, 'Token exists:', !!token) // debug line

    const isProtected = path.startsWith('/watchlist')
    const isAuthPage = path.startsWith('/signup') || path.startsWith('/login')

    let user = null
    if (token) {
        try {
            user = await verifyToken(token)
        } catch {
            user = null
        }
    }

    if (isProtected && !user) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (isAuthPage && user) {
        return NextResponse.redirect(new URL('/watchlist', req.url))
    }

    return NextResponse.next()
}

export const config = { matcher: ['/watchlist/:path*', '/login', '/signup'] }