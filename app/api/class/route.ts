import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Student } from "@prisma/client";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(req:Request,
    
    
    ){

try{
const {userId}=auth();
const { students,
    teacher,
    name,
    id,
    passedOut
,
    subject,
    startTime ,
    endTime}=await req.json();
if(!userId){
    return new NextResponse("unauthorized",{status:400});
}
console.log("editing the section")
if(id){
    
    console.log("inside if(id)")
    console.log("value of id",id);
    console.log("value of students",students)
    if(passedOut===true||passedOut===false){
        console.log("inside passsed out");
        console.log("value  of pased out",passedOut)
        const updatedclass=await client.class.update({
            where:{
                id:id
            },
            data:{
             passedOutDate:format(new Date(),'dd.MM.yyyy'),
            passedOut:passedOut,
            
            },
            
        })
        return NextResponse.json(updatedclass);
    }
    const existing=await client.class.findUnique({
        where:{
            id:id
        },
        include:{
            students:true,
            teachers:true,
        }
      })
    const updatedclass=await client.class.update({
        where:{
            id:id
        },
        data:{
        name:name.label,
        subject:subject,
        startTime:startTime,
        endTime:endTime,
        passedOut:passedOut,
        students:{
          disconnect:existing?.students?.map((st)=>({id:st?.id})),
            connect:students.map((st:any)=>({id:st.value})),
        },
        teachers:{
            connect:{id:teacher.value}
        }
        },
        
    })
    console.log("updated section")
    console.log("updated section",updatedclass)
    return NextResponse.json(updatedclass)
}else{
    const newclass=await client.class.create({
        data:{
            name:name.label,
                subject:subject,
                startTime:startTime,
                endTime:endTime,
                passedOut:false,
                students:{
                    connect:students.map((st:any)=>({id:st.value})),
                },
                teachers:{
                    connect:{id:teacher.value}
                }
                
        }
    })
    return NextResponse.json(newclass);
}

 
return new NextResponse("not found",{status:404});
}catch(err){
    console.log("[ERRROR /api/class ",err);
    return new NextResponse("internal server error",{status:500});
}

        
    }