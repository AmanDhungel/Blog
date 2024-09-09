import { NextRequest, NextResponse } from 'next/server';

// Define the login page URL
const LOGIN_URL = '/login';

// Middleware function to check for the authentication token
export function middleware(req: NextRequest) {
  const token = req.cookies.get('token'); // Retrieve the token from cookies

  if (token) {
    // If token exists, continue to the requested page
    return NextResponse.redirect('/addBlog')
  } else {
    // If token does not exist, redirect to the login page
    return NextResponse.redirect(new URL(LOGIN_URL, req.url));
  }
}

// Define the paths where the middleware should be applied
export const config = {
    matcher: ['/user/:path*', '/login/:path*', '/signup/:path*'], // Apply middleware to all pages under /user/
  };