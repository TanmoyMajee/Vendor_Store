import { NextResponse } from 'next/server';
import { verifyIdToken } from './lib/verifytoken';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log('�� Middleware running for:', pathname);

  // Get the Authorization header
  const authHeader = request.headers.get('authorization');
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
    console.log('🔑 Token found in header');
  }

  // Check if it's a protected route
  // pathname.startsWith('/dashboard') || 
  const isProtectedRoute =  pathname.startsWith('/api/vendor');
  if (isProtectedRoute) {
    if (!token) {
      console.log('❌ No token found for protected route');
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Authentication required', message: 'No token provided' },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // toekn provied so verify it using firebase rest api 
    try {
      console.log('�� Verifying token...');
      const decodedToken = await verifyIdToken(token);

      if (!decodedToken) {
        console.log('❌ Token verification failed');
        if (pathname.startsWith('/api/')) {
          return NextResponse.json(
            { error: 'Authentication failed', message: 'Invalid or expired token' },
            { status: 401 }
          );
        }
        return NextResponse.redirect(new URL('/login', request.url));
      }

      console.log('✅ Token verified successfully');

      // Add user info to headers for API routes
      if (pathname.startsWith('/api/')) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', decodedToken.uid);
        requestHeaders.set('x-user-email', decodedToken.email);

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }
      
    } catch (error) {
      console.error('💥 Middleware error:', error);
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Authentication failed', message: 'Token verification failed' },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/vendor/:path*'
  ]
};