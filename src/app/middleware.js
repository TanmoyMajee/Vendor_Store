import { NextResponse } from 'next/server';
import { verifyIdToken } from '../lib/verifytoken';

export async function middleware(request) {
  console.log('🚀 Middleware running for:', request.nextUrl.pathname);

  // Get the Authorization header
  const authHeader = request.headers.get('authorization');
  console.log('🔑 Auth header:', authHeader ? 'Present' : 'Missing');

  let token;
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
    console.log('🔑 Token extracted:', token ? 'Yes' : 'No');  
  }

  // Check if it's an API route
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/'); 
  console.log('🔑 Is API route:', isApiRoute);

  if (!token) {
    console.log('❌ No token found');
    if (isApiRoute) {
      console.log('🚫 Returning 401 for API route');
      return NextResponse.json(
        { error: 'Authentication required', message: 'No token provided' },
        { status: 401 }
      );
    }
    console.log('🔄 Redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    console.log('🔑 Verifying token...');
    const decodedToken = await verifyIdToken(token);
    console.log('✅ Token verification result:', decodedToken ? 'Success' : 'Failed');

    if (!decodedToken) {
      console.log('❌ Token verification failed');
      if (isApiRoute) {
        return NextResponse.json(
          { error: 'Authentication failed', message: 'Invalid or expired token' },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }

    console.log('✅ Token verified successfully');

    // Add user info to headers for API routes
    if (isApiRoute) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decodedToken.uid);
      requestHeaders.set('x-user-email', decodedToken.email);

      console.log('✅ User authenticated:', decodedToken.email);
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    return NextResponse.next();
  } catch (error) {
    console.error('💥 Middleware error:', error);
    if (isApiRoute) {
      return NextResponse.json(
        { error: 'Authentication failed', message: 'Token verification failed' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/api/vendor/:path*',
    '/dashboard/:path*',
    // Add more as needed
  ],
};