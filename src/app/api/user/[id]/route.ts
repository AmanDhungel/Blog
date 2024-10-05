import { NextRequest, NextResponse } from "next/server";
import Blog from "../../model/blog.model";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest,  {params} : any ){
    const {id} = params;
    try {

      const blog = await Blog.findById(id);
     return NextResponse.json({blog});
    } catch (error) {
     return NextResponse.json({message: "no item with this id", error}, {status : 500});
    }
}
export async function DELETE(req: NextRequest,  {params} : any ){
    const {id} = params;
    console.log(id);
    try {
      const token = req.cookies.get('token')!;
      const decoded = await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET));
      console.log(token.value)

      const blog = await Blog.findById(id);

      if(blog.userId !== decoded.payload.id){
        return NextResponse.json('Unauthorized', {
            status: 401
        })
      }

     const data= await Blog.findByIdAndDelete(id);
     revalidatePath('/user/myBlogs');
     return NextResponse.json({data});
    } catch (error) {
     return NextResponse.json({message: "no item with this id", error}, {status : 500});
    }
}