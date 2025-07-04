import { NextResponse } from 'next/server';
import { verifyIdToken } from '../lib/verifytoken';

export async function middleware(request) {
  // Get the Authorization header
  const authHeader = request.headers.get('authorization');
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const decodedToken = await verifyIdToken(token);

  if (!decodedToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/vendor/:path*',
    '/dashboard/:path*',
    // Add more as needed
  ],
};