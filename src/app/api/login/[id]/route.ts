import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../_lib/connect";
import User from "../../model/user.model.js";

export async function GET(req: NextRequest, {params} : {params : object}){
    connectDb();
    try {
        const {id} = params;
        const users = await User.findById(id)
        return NextResponse.json(users);
        
    } catch (error) {
        return NextResponse.json({message: "Cannot Find the User with this id"}, {status: 404})
    }
}

export async function DELETE(req: NextRequest, {params} : {params : object}){
    connectDb();
    try {
        const {id} = params;
        const users = await User.findByIdAndDelete(id)
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({message: "Cannot Find the User with this id"}, {status: 404})
    }
}