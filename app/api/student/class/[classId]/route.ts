export const dynamic = 'force-dynamic'; 
import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Student } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req:Request,
    {params}:{params:{classId:number}}){

try{
const {userId}=auth();

if(!userId){
    return new NextResponse("unauthorized",{status:400})
}

const allStudents:Student[]=await client.student.findMany();

return NextResponse.json(allStudents);


}catch(err){
    console.log("[EROR /api/student/class/[classId]]")
return new NextResponse("internal server error",{status:500});
}
}