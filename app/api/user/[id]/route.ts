import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";

export async function GET(req:Request,
    {params}:{
        params:{id:string}
    }){
try{
const {userId}=auth();
if(!userId||!params?.id){
    return new NextResponse("Unauthorized",{status:400})
}

const user=await client.user.findUnique({
    where:{
        clerkId:params.id
    }
})
if(!user){
    return new NextResponse("not found",{status:404})
}

return NextResponse.json(user);
}catch(err){
console.log("[ERROR /api/user/[email]]");
return new NextResponse("Internal server error",{status:500});}


}