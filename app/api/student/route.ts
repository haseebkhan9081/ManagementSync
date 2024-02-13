export const dynamic = 'force-dynamic'; 
import { auth } from "@clerk/nextjs";
import db from "@/lib/prismadb";
import { NextResponse } from "next/server"; 
export async function POST( 
    req:Request
){
    try{
        const {
            name,
              age,
              FatherName,
              phone,
              adress,
              imageUrl,
              sections,
        }=await req.json();
        const {userId}=auth();
    if(!userId){ 
       return new NextResponse("unauthorized",{status:401})
    } 
   
   const newStudent =await db.student.create({data:{
       Name:name,
       age:age,
   imageUrl:imageUrl,
   fatherName:FatherName,
   Contact:phone,
   Address:adress,
   classes:{
    connect:sections.map((sect:any)=>({id:sect.value}))
   }
   }});
  
   return  NextResponse.json(newStudent);
  
}catch(err){
    console.log("[Error at /api/student]",err);
    return new NextResponse("Internal Server Error [api/Student]",{status:500})
}
 

}
 