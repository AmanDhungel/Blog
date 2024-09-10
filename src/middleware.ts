import { NextRequest, NextResponse } from 'next/server';

// Define the login page URL
const LOGIN_URL = '/login';
const BLOG_URL = '/user/addBlog';

// Middleware function to check for the authentication token
export function middleware(req: NextRequest) {
  const token = req.cookies.get('token'); // Retrieve the token from cookies

  if (token) {
    console.log(req.url)
    if(req.url === 'https://blog-7stbd7isa-amandhungels-projects.vercel.app/login' || req.url === 'https://blog-7stbd7isa-amandhungels-projects.vercel.app/signup'){
      return NextResponse.redirect(new URL(BLOG_URL, req.url))
    }
    // If token exists, continue to the requested page
  } else {
    // If token does not exist, redirect to the login page
    if(req.url === 'https://blog-7stbd7isa-amandhungels-projects.vercel.app/user/addBlog'){
    return NextResponse.redirect(new URL(LOGIN_URL, req.url));
    }
  }
}

// Define the paths where the middleware should be applied
export const config = {
    matcher: ['/user/:path*', '/login/:path*', '/signup/:path*'], // Apply middleware to all pages under /user/
  };