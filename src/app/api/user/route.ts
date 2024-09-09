import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Blog from '../model/blog.model.js';  // Assuming blog model is in models folder
import { connectDb } from '../_lib/connect'; // Assuming connectDb is in _lib folder
import { cookies } from 'next/headers.js';
import { jwtVerify } from 'jose';

export async function GET(req: NextRequest) {
    await connectDb();
  
    const token = cookies().get('token'); // Get the token from the cookie

    if (!token) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    try {
        const decoded = await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET)); // Decode the token to get the user ID
        // Fetch the blogs where userId matches the logged-in user's ID
        const blogs = await Blog.find({ userId: decoded.payload.id });
        return NextResponse.json( blogs );
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
