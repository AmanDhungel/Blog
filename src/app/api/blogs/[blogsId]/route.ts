import { NextRequest, NextResponse } from 'next/server';
import Blog from '../../model/blog.model.js'
import { connectDb } from '../../_lib/connect.js';
import { useRouter } from 'next/router.js';
import { useParams } from 'next/navigation.js';


export async function GET(req : NextRequest, {params} : {params: {blogsId: string}}){
     const {blogsId} = params;
       try {
        const data= await Blog.findById(blogsId);
        return NextResponse.json({data});
       } catch (error) {
        return NextResponse.json({message: "no item with this id", error}, {status : 500});
       }
     // Route -> /shop/[tag]/[item]
    // URL -> /shop/shoes/nike-air-max-97
    // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
   
}
export async function DELETE(req : NextRequest, {params} : {params: {blogsId: string}}){
     const {blogsId} = params;
       try {
        const data= await Blog.findByIdAndDelete(blogsId);
        return NextResponse.json({message: "item deleted successfully", data});
       } catch (error) {
        return NextResponse.json({message: "error deleting item", error}, {status : 500});
       }
     // Route -> /shop/[tag]/[item]
    // URL -> /shop/shoes/nike-air-max-97
    // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
   
}