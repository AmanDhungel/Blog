import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '../_lib/connect';
import User from '../model/user.model';
import bcrypt from 'bcryptjs';
import { generateToken } from '../_lib/generateTokenAndSetCookies';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  await connectDb();
    try {
    const body = await req.json();
    const { email, password } = body;

    console.log("email", email, "password", password);


    console.log("email",email, "password", password);
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found with this email' }, { status: 401 });
    }

    // Check if password is valid
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ message: 'Invalid Credential' }, { status: 401 });
    }

    // Generate token
    const token = await generateToken(user.id, user.name);
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Set the token cookie
    const response = NextResponse.json(userWithoutPassword);
    cookies().set('token', token, {
      httpOnly: true,  // Ensures the cookie is only accessible by the server
      secure: process.env.NODE_ENV === 'production',  // Ensure secure cookies in production
      sameSite: 'strict',  // Prevent CSRF
      path: '/',  // Cookie available for all routes
    });
    revalidatePath('/login')
    return NextResponse.json({token: token, message: "User has logged In"}, {status: 201});

  } catch (error) {
    console.error('Invalid Credentials');
    return NextResponse.json({message: 'Invalid Credentials'}, {status: 400});
  }
}
