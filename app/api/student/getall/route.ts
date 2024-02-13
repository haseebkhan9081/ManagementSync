export const dynamic = 'force-dynamic'; 
import { auth } from "@clerk/nextjs"; 
import { NextResponse } from "next/server";
import { Student } from "@prisma/client"; 
import client from "@/lib/prismadb";
export   async function GET( 
    req:Request
){
 
    try{
        
        const {userId}=auth();
    if(!userId){ 
       return new NextResponse("unauthorized",{status:401})
    }
 const count=await client.student.count();
   const students:Student[]=await client.student.findMany({
    
    include:{
        _count:true,
        attendances:true,
        classes:{
            include:{
                attendence:true,
                Grade:{include:{
                    class:true
                },
                    orderBy:{
                       Date:'asc'
                    }
                },
            }
        },
        grades:true
    }
   });
    
   if(!students.length){
   return NextResponse.json([]);
   }
    
 


   return  NextResponse.json(students);

}catch(err:any){
    console.log("[management_sync/app/api/student/getall]",err);
    return new NextResponse("Internal Server Error [api/Student/getall]",{status:500})
}
 

}
 