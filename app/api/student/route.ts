export const dynamic = 'force-dynamic'; 
import { auth } from "@clerk/nextjs";
import db from "@/lib/prismadb";
import { NextResponse } from "next/server"; 
export   async function POST( 
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
        console.log(userId);
        console.log("unauthorized");
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
   if(newStudent){
   return  NextResponse.json(newStudent);
   }
return new NextResponse("Failed to create new Student",{status:403});
}catch(err:any){
    console.log("[Error at /api/student]",err);
    return new NextResponse("Internal Server Error [api/Student]",{status:500})
}
 

}
 