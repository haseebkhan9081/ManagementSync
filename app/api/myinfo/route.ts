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
    }
  })
       
   
      return NextResponse.json(teacher);
    } catch (err) {
      console.log("[ERROR api/student/[studentid] - GET]", err);
      return new NextResponse("Internal Server error", { status: 500 });
    }
  }
     