import { StudentAttendnceBox } from "@/app/(dashboard)/_components/StudentAttendnceBox";
import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function PATCH(req:Request){

    // endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
  
try{
    const {id}=await req.json();
const {userId}=auth();
const today=new Date();
const formattedDate=format(today,'dd.MM.yyyy');
const currentMonth = today.getMonth() + 1; // Months in JavaScript are 0-indexed
  const currentYear = today.getFullYear();
if(!userId){

    return new NextResponse("unauthorized",{status:400});
}

const student=await client.student.findUnique({
    where:{
        id:id
    }
})

if(!student){
    return new NextResponse("not found",{status:404});
}
const updated=await client.student.update({
    where:{
        id:id
    },
    data:{
        ReliveCounter:((student?.ReliveCounter||0)+1) ,
        ReliveMonth:currentMonth,
    }
})
 return NextResponse.json( 
    updated )

}   catch(err){

    console.log("[management_sync/app/api/student/warning/relive/route.ts",err);

    return new NextResponse("Internal server Error",{status:500});
} 
}

