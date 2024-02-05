import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function GET(req:Request,
    {params}:{
        params:{classId:number}
    }){

try{
const {userId}=auth();
if(!userId||!params.classId){
    return new NextResponse("unauthorized",{status:400});
}

const result=await client.class.findUnique({
    where:{
        id:Number(params.classId)
    },
    include:{
        students:true,
        teachers:true,
        attendence:true
    }
})

if(!result){
    return new NextResponse("not found",{status:404})
}
return NextResponse.json(result);

}catch(err){
    console.log("[ERROR /api/class/studnet/[classId]]",err)
    return new NextResponse("INternal server erro",{status:500});
}

    }