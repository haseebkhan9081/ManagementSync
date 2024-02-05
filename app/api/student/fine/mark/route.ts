import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function PATCH(req:Request){


try{
const {userId}=auth();
const today=new Date();
const formattedDate=format(today,'dd.MM.yyyy');
const currentMonth = today.getMonth() + 1; // Months in JavaScript are 0-indexed
  const currentYear = today.getFullYear();
const {due,payed,
  id}=await req.json();

  if(!userId){

    return new NextResponse("unauthorized",{status:400});
}
const updated=await client.attendance.updateMany({
  where:{
    studentId:id
  },
  data:{
    due:due,
    payed:payed
  }
}) 

return NextResponse.json(updated);
}   catch(err){

    console.log("management_sync/app/api/student/fine/mark/route.ts",err);

    return new NextResponse("Internal server Error",{status:500});
} 
}