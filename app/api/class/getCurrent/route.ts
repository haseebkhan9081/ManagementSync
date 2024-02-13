export const dynamic = 'force-dynamic';
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
  
const clas= await client.class.findMany({
    where:{
        passedOut:{
            not:true,
        }
    },
    include:{
        students:true,
        
    },
    orderBy:{
        id:"desc"
    },
});

 if(clas[0]){
    return NextResponse.json(clas);
}
return new NextResponse("No class found",{status:400}); 

 
}catch(err){
    console.log("[ERROR /api/class/getcurrent]",err);
return new NextResponse("internal server erro",{status:500});

}

}