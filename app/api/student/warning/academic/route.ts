export const dynamic = 'force-dynamic';
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"; 
import client from "@/lib/prismadb";

export async function GET( 
    
){
    try{
        const {userId}=auth();
    if(!userId){
        
       return new NextResponse("unauthorized",{status:401})
    } 
   const Average=await client.average.findMany({
    where:{
        student:{
            DeActive:false,
        },
Average:{
lt:50
}
    },
    include:{
        class:true,
        student:true,
    }
   })
   

   console.log(Average,"the average",Average);
  if(Average){
    return NextResponse.json(Average);
  } 
return new NextResponse("Failed to create new Student",{status:403});
}catch(err:any){
    console.log("[Error at /api/student]",err);
    return new NextResponse("Internal Server Error [api/Student]",{status:500})
}
 

}
 