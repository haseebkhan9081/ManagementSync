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
const generateRandomText = (length=10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  const name=generateRandomText();
  const subject=generateRandomText();
const clas=await client.class.create({
    data:{
        name:name,
        subject:subject,
        teacherid:1
    }
});

if(!clas){
return new NextResponse("there was a problem creting new class",{status:403});
}

return NextResponse.json(clas);
}catch(err){
    console.log("[ERROR /api/class]",err);
return new NextResponse("internal server erro",{status:500});

}

}