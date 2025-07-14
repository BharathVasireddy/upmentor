import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const ADMIN_PATH = /^\/api\/admin\//
const MENTOR_PATH = /^\/api\/mentors\//
const USER_PATH = /^\/api\/users\//

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // Only protect API routes
  if (!pathname.startsWith('/api/')) return NextResponse.next()

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Role-based access
  if (ADMIN_PATH.test(pathname)) {
    if (token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  } else if (MENTOR_PATH.test(pathname)) {
    if (token.role !== 'MENTOR' && token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  } else if (USER_PATH.test(pathname)) {
    // Any authenticated user
    // Optionally, restrict further by role if needed
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
