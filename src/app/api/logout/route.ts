import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(){
cookies().delete('token');
revalidatePath('http://localhost:3000/login');
return NextResponse.redirect('http://localhost:3000/login');
}