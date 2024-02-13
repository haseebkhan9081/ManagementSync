import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
     const {
        classId
     }=await req.json();
     const {userId}=auth();
     if(!userId){
     return new NextResponse("unauthorized",{status:400})
     }
 const attendance=await client.attendance.findMany({
    where:{
    classId:classId,
    },
    include:{
        student:true,
    }
 })
 
 return NextResponse.json(attendance);
 
    }catch(err){
        console.log("[Err at api/attendance/get]",err);
     return new NextResponse("Internal server error",{status:500})
    } 
 }
 
 