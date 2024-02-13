import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { parseArgs } from "util";

export async function POST(req:Request,
     
    ){

try{
const {
    id,
    teacher,
    admin,
    visitor,
    firstName,
    lastName,
    imageUrl,
    email}=await req.json();
 const {userId}=auth();   

 console.log("id recieved in /api/id",id);
if(!userId||!id){
    return new NextResponse("Unauthorized User",{status:400});
}

const user=await client.user.findUnique({
    where:{
        clerkId:id
    }
});
//if this person is a teacher then we need to create a teacher in our database;

if(teacher){
const t=await client.teacher.findUnique({
    where:{
        clerkId:id
    }
});

if(!t){
    const te=await client.teacher.create({
        data:{
           firstName,
           lastName,
           imageUrl,
           clerkId:id,
           email:email
            
        }
    })
    if(te){
        console.log("teacher create with clerkId",te.clerkId)
    }
    }else{
        await client.teacher.update({
            where:{
                clerkId:id
            },
            data:{
                firstName,
                   lastName,
                   imageUrl,
                   clerkId:id,
                   email:email
            }
        })
    }
}
let holder:User;
if(user){
const updatedUser=await client.user.update({
    where:{
       clerkId:id
    },
    data:{
admin:admin,
teacher:teacher,
visitor:visitor
    }
})
holder=updatedUser;
}else{

const newUser=await client.user.create({
    data:{
        clerkId:id,
        admin:admin,
        teacher:teacher,
        visitor:visitor,
    
    }
})    
holder=newUser;
}
return   NextResponse.json(holder);

}catch(err){
console.log("[ERR at /api/[id]]",err);
return new NextResponse("Internal Server error",{status:500});
}



    }