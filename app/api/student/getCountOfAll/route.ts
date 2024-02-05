import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
 
import { NextResponse } from "next/server";

export async function POST(req:Request){

try{

    const {date}=await req.json();
const {userId}=auth();

if(!userId){
return new NextResponse("unauthorized",{status:400})
}
const AbsentOrLeaveToday=await client.attendance.findMany({
    where:{
        
        date:date,
        OR:[
           {absent:true},
           {leave:true}
        ],
        student:{
            DeActive:false
        }
    },
    include:{
        student:true,
        class:true,
    }

}) 
const countOfAll=await client.student.count({
    where:{
        DeActive:false,
    }
});
const countOfPresentToday=await client.student.count({
    where:{
        DeActive:false,
        attendances:{
            some:{
                present:true,
                date:date
            }
        }
    }
 })
const countOfOnLeaveToday= await client.student.count({
    where:{
        DeActive:false,
        attendances:{
            some:{
                date:date,
                leave:true
            }
        }
    }
})
const countOfAbsentToday= await client.student.count({
    where:{
        DeActive:false,
        attendances:{
            some:{
                date:date,
                absent:true
            }
        }
    }
})

return NextResponse.json({
    total:countOfAll,
    profiles:AbsentOrLeaveToday,
    present:countOfPresentToday,
    leave:countOfOnLeaveToday,
    absent:countOfAbsentToday

})

}catch(err){
console.log("[/api/student/getCountOfAll]",err);
return new NextResponse("Internal server Error",{status:500})
}

}