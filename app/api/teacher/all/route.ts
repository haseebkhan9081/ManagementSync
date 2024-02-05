import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Teacher } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req:Request
){
    try{
const {userId}=auth();
if(!userId){
    return new NextResponse("unauthorized]",{status:500});

}
const allTeachers:Teacher[]=await client.teacher.findMany();

return NextResponse.json(allTeachers);
    }catch(err){
console.log("[ERRO /api/teacher/all]",err);
return new NextResponse("internal server error",{status:500});

    }
}