import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
     const {
        classId,
        date,
        id
     }=await req.json();
     const {userId}=auth();
     if(!userId){
     return new NextResponse("unauthorized",{status:400})
     }
 const attendance=await client.attendance.findUnique({
    where:{
    studentId_classId_date:{
        studentId:id,
        classId:classId,
        date:date      

    },
    },
     
 })
 
 return NextResponse.json(attendance);
 
    }catch(err){
        console.log("[Err at api/attendance/getCurrent]",err);
     return new NextResponse("Internal server error",{status:500})
    } 
 }
 
 