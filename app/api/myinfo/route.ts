export const dynamic = 'force-dynamic';
import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";
import { NextResponse } from "next/server";





export async function GET(req: Request,
     ) {
    try {
      const { userId } = auth();
  
      if (!userId ) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  const teacher=await client.teacher.findUnique({
    where:{
        clerkId:userId
    }})
   const dbuser=await client.user.findUnique({
    where:{
        clerkId:userId
    }}) 
  
       
   
      return NextResponse.json({
        teacherId:teacher?.id||0,
        teacher:dbuser?.teacher,
        visitor:dbuser?.visitor,
        admin:dbuser?.admin,
        clerkId:userId,
      } );
    } catch (err) {
      console.log("[ERROR api/myinfo]", err);
      return new NextResponse("Internal Server error", { status: 500 });
    }
  }
     