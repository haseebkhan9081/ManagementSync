export const dynamic = 'force-dynamic';
import client from "@/lib/prismadb";
import { auth, clerkClient } from "@clerk/nextjs"
import { NextResponse } from "next/server";

export async function GET(req:Request,
   ){
try{
const {userId}=auth();

const user = await clerkClient.users.getUser(userId!);
if(!userId){
    return new NextResponse("Unauthorized",{status:400})
}

const usert=await client.user.findUnique({
    where:{
        clerkId:userId
    }
})
console.log(usert,user?.emailAddresses[0].emailAddress,user?.firstName,user?.lastName,user?.imageUrl,userId,user?.emailAddresses[0].emailAddress,user?.firstName,user?.lastName,user?.imageUrl,userId,user?.emailAddresses[0].emailAddress,user?.firstName)
if(usert){
    const update=await client.user.update({
        where:{
            clerkId:userId
        },
        data:{
            emailAddress:user?.emailAddresses[0].emailAddress,
            firstName:user?.firstName,
            lastName:user?.lastName,
            imageUrl:user?.imageUrl,
        }})
    return NextResponse.json(update);
}

const newUser=await client.user.create({
    data:{
        clerkId:userId,
        admin:false,
        teacher:false,
        visitor:false,
        emailAddress:user?.emailAddresses[0].emailAddress,
        firstName:user?.firstName,
        lastName:user?.lastName,
        imageUrl:user?.imageUrl,
    }
});
 return NextResponse.json(newUser);
}catch(err){
console.log("[ERROR /api/user/create]",err);
return new NextResponse("Internal server error",{status:500});}


}