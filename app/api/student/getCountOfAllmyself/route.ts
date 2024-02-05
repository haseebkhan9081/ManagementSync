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
DeActive:false,
        },
        class:{
            teachers:{
                 clerkId:userId
            }
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
        classes:{
            some:{
                teachers:{
                    clerkId:userId
                }
            }
        }
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
        },
        classes:{
            some:{
                teachers:{
                    clerkId:userId
                }
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
        },
        classes:{
            some:{
                teachers:{
                    clerkId:userId
                }
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
        },
        classes:{
            some:{
                teachers:{
                    clerkId:userId
                }
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
console.log("[/api/student/getCountOfAllmyself]",err);
return new NextResponse("Internal server Error",{status:500})
}

}