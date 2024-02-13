import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request){


    try{
const {userId}=auth();
const {
    
    classId,
}=await req.json();

if(!userId){
    return new NextResponse("Unauthorized",{status:400})
}

const existingGrade=await client.grade.findMany({
    where:{
         classId:classId
    },
    orderBy:{
        Date:"desc"
    },
    include:{
student:true,
class:true,
    },
    cacheStrategy:{
        swr:60,
        ttl:60,
    }
})
 
return NextResponse.json(existingGrade);
   
    }catch(err:any){
        console.log("[ERROR AT api/grades/get]",err);

        return new NextResponse("Internal Server Error",{status:500});

    }
}