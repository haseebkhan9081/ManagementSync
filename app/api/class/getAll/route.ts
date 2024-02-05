import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    
){

try{
const {userId}=auth();

if(!userId){
    return new NextResponse("Unauthorized",{status:400});
}
  
const clas= await client.class.findMany();

 

return NextResponse.json(clas);
}catch(err){
    console.log("[ERROR /api/class/getAll]",err);
return new NextResponse("internal server erro",{status:500});

}

}