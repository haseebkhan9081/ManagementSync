import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Teacher } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req:Request){

try{
const {userId}=auth();

if(!userId){
    return new NextResponse("Unauthorized",{status:400});
}
const teachers:Teacher[]=await client.teacher.findMany();

return NextResponse.json(teachers);

}catch(err){
    console.log("[ERROR /api/teacher]")
return new NextResponse("Internal server error",{status:500});
}

}