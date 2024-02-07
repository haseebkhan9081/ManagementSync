import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request){

    try{
const {     isPresent,
            isAbsent,
            TeacherId,
            clerkId,
            arrival,
            date,
            departure
}=await req.json();
const {userId}=auth();
console.log("at api",
    isAbsent,isPresent )
if(!userId){
    return new NextResponse("UnAuthorized",{status:400});
}

const att=await client.teacherAttendance.findUnique({
    where:{
        date_clerkid:{
            date:date,
            clerkid:clerkId
        }
    }
})

if(att){
    if(departure?.length>0){
const updated=await client.teacherAttendance.update({
    where:{
        date_clerkid:{
            date,
            clerkid:clerkId
        }
    },
    data:{
   departure:departure
    }
})
return  NextResponse.json(updated);
}
else if(arrival?.length>0){
    const updated=await client.teacherAttendance.update({
        where:{
            date_clerkid:{
                date,
                clerkid:clerkId
            }
        },
        data:{
      Arrival:arrival
        }
    }) 
return NextResponse.json(updated);
}else if(isAbsent||isPresent){
    const updated=await client.teacherAttendance.update({
        where:{
            date_clerkid:{
                date,
                clerkid:clerkId
            }
        },
        data:{
     isAbsent,
     isPresent
        }
    }) 
return NextResponse.json(updated);

}

}else{
const newatt=await client.teacherAttendance.create({
    data:{
        clerkid:clerkId,
        teacherId:TeacherId,
        Arrival:arrival,
        departure:departure,
        date:date,
        isPresent:false,
        isAbsent:false ,

    }
})

return NextResponse.json(newatt);
}
return NextResponse.json(att);

}catch(Err:any){
        console.log("[ERROR AT api/teacherAttendance]",Err);
        return new NextResponse("INternal Server error",{status:500})
    }
}