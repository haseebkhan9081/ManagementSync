export const dynamic = 'force-dynamic';
import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req:Request){

try{
const {userId}=auth();
if(!userId){
    return new NextResponse("unauthorized",{status:400})
}
const teacher=await client.teacher.findUnique({
    where:{
        clerkId:userId
    }
});

if(teacher){
    const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months in JavaScript are 0-indexed
  const currentYear = currentDate.getFullYear();

  const total = await client.teacherAttendance.findMany({
     
    where: {
      clerkid:userId,
      date: {
        endsWith: `.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
      },
    },
    distinct:['date']
  });
  const present=await client.teacherAttendance.count({
    where:{
      clerkid:userId,
        date:{
            endsWith: `.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
        },
        isPresent:true,
    }
  })
  const leave=await client.teacherAttendance.count({
    where:{
      clerkid:userId,
        date:{
            endsWith: `.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
    
        },
        isAbsent:true
    }
  })
  const leaveProfile=await client.teacherAttendance.findMany({
    where:{
      clerkid:userId,
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
    console.log("[Error management_sync/app/api/selfAttendance/route.ts]",err);
    return new NextResponse("Internal server Error",{status:500});
}
}