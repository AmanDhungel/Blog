import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export const verifyToken = () => {
   const cookie =  cookies().get('token');
   try {
       const decoded = jwt.verify(cookie.value, process.env.JWT_SECRET);
       if(!decoded){
        return NextResponse.json({message: 'token doesnot match'})
       }
       return decoded
       
   } catch (error) {
    return NextResponse.json({message: 'cannot decode the jwt', error}, {status: 400})
   }
}