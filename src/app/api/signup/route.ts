import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../_lib/connect";
import User from "../model/user.model";
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest){
    connectDb();
    try {
        const body = await req.json()
        const {name, email, password, img, blog} = body
        const user = await User.findOne({email})
        if(user){
        return Response.json({message: "user already exist"}, {status: 400})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
        name, email, password : hashedPassword, img, blog
        })
        return NextResponse.json(newUser);
    } catch (error) {
        return Response.json({message: "cannot add user", error}, {status: 400})
    }
}