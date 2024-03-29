import client from "@/lib/prismadb";
export const dynamic = 'force-dynamic';
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:Request){

try{
  const {
id
  }=await req.json()
const {userId}=auth();
if(!userId){
    return new NextResponse("unauthorized",{status:400})
}
const teacher=await client.teacher.findUnique({
    where:{
        clerkId:id
    }
});

if(teacher){
    const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months in JavaScript are 0-indexed
  const currentYear = currentDate.getFullYear();

  const total = await client.teacherAttendance.findMany({
     
    where: {
      clerkid:id,
      date: {
        endsWith: `.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
      },
    },
    distinct:['date']
  });
  const present=await client.teacherAttendance.count({
    where:{
      clerkid:id,
        date:{
            endsWith: `.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
        },
        isPresent:true,
    }
  })
  const leave=await client.teacherAttendance.count({
    where:{
      clerkid:id,
        date:{
            endsWith: `.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
    
        },
        isAbsent:true
    }
  })
  const leaveProfile=await client.teacherAttendance.findMany({
    where:{
      clerkid:id,
        date:{
            endsWith: `.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
    
        },
        isAbsent:true,
        
    }, 
  })
return  NextResponse.json({
    total:total.length,
    present,
    leave,
    leaveProfile
})
}
return new NextResponse("not found",{status:404});
}catch(err){
    console.log("[Error management_sync/app/api/selfAttendance/get]",err);
    return new NextResponse("Internal server Error",{status:500});
}
}