import { NextRequest, NextResponse } from 'next/server';
import Blog from '../model/blog.model.js'
import { connectDb } from '../_lib/connect.js';
import { cookies } from 'next/headers.js';
import { jwtVerify } from 'jose';
export async function GET(){
    await connectDb();
    try {
        const data = await Blog.find();
        return NextResponse.json(data, {status:200})
    } catch (error : any) {
        console.log(error)
        return NextResponse.json({message:  error.message}, {status: 500});
    }
}

export async function POST(req : NextRequest){
    await connectDb();
    const body = await req.json();
    const token = cookies().get('token')!;
    console.log(token);
    const decode = await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET));
    console.log("payload ID", decode.payload.id);
    const {title, description, images, titledesc} = body;
    try {
        const blog = await Blog.create({title, titledesc,  description, images, userId : decode.payload.id});
        return NextResponse.json(blog, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: error}, {status: 500});
    }
}

export async function DELETE(req : NextRequest){
    await connectDb();
    const body = await req.json();
    const {title, description, images} = body;
    try {
        const blog = await Blog.create({title, description, images});
        return NextResponse.json(blog, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: error}, {status: 500});
    }
}