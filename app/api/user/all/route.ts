export const dynamic = 'force-dynamic';
import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";

export async function GET(req:Request,
   ){
try{
const {userId}=auth();
if(!userId){
    return new NextResponse("Unauthorized",{status:400})
}
const user=await client.user.findMany();
 if(user.length===0){
    return  NextResponse.json([]);
 }
 return NextResponse.json(user);
}catch(err){
console.log("[ERROR /api/user/all",err);
return new NextResponse("Internal server error",{status:500});}


}