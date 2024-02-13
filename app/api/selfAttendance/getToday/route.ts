export const dynamic = 'force-dynamic';
import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:Request){

try{
  const currentDate = new Date(); 
const d=format(currentDate, "dd.MM.yyyy");
const {userId}=auth();
if(!userId){
    return new NextResponse("unauthorized",{status:400})
}
 const today=await client.teacherAttendance.findUnique({
where:{
date_clerkid:{
  date:d,
clerkid:userId,
}
}
 }) 
 return NextResponse.json(today);
}catch(err){
    console.log("[Error management_sync/app/api/selfAttendance/getToday]",err);
    return new NextResponse("Internal server Error",{status:500});
}
}