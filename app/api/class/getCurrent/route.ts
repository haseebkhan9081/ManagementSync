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
    cacheStrategy:{
        swr:60,
        ttl:60
    }
});

 console.log(clas.length)

return NextResponse.json(clas);
}catch(err){
    console.log("[ERROR /api/class/getcurrent]",err);
return new NextResponse("internal server erro",{status:500});

}

}