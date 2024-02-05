import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Student } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,
    {params}:{
        params:{classId:number}
    }){

try{
const {userId}=auth();
const { students,
    teacher,
    name,
    subject,
    startTime ,
    endTime}=await req.json();
if(!userId||!params.classId){
    return new NextResponse("unauthorized",{status:400});
}

const updatedclass=await client.class.update({
    where:{
        id:Number(params.classId)
    },
    data:{
    name:name.label,
    subject:subject,
    startTime:startTime,
    endTime:endTime,
    students:{
        connect:students.map((st:any)=>({id:st.value})),
    },
    teachers:{
        connect:{id:teacher.value}
    }
    },
    
})

if(!updatedclass){
    return new NextResponse("not found",{status:404});
}
return  NextResponse.json(updatedclass);

}catch(err){
    console.log("[ERRROR /api/class/[classID]]",err);
    return new NextResponse("internal server error",{status:500});
}

        
    }