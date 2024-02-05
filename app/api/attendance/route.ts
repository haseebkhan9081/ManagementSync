import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { parse } from "date-fns";
 
import { NextResponse } from "next/server";

export async function POST(req:Request){

try{
const {
    topic,
            isAbsent,
            isOnLeave,
            fine,
            isPresent,
            classId,
            id,
            date,
            reason,
            due
}=await req.json();
const {userId}=auth();
if(!userId){
return new NextResponse("unauthorized",{status:400})
}

const today=parse(date,'dd.MM.yyyy',new Date()); 
const currentMonth = today.getMonth() + 1; // Months in JavaScript are 0-indexed
const currentYear = today.getFullYear();

const ifExists=await client.attendance.findUnique({
    where:{
        studentId_classId_date: {
            studentId: id,
            classId: classId,
            date:date
        }
    }
});

if(ifExists){
    const updated=await client.attendance.update({
        where:{
            studentId_classId_date:{
                studentId: id,
                classId: classId, 
                date:date
            },
            
        },
        data:{
            present:isPresent,
absent:isAbsent,
leave:isOnLeave,
topic:topic,
fine:fine,
date:date,
reason:reason,
due:due
        }
    })

    const all=await client.attendance.count({
        where:{
            studentId: id,
                    classId: classId, 
                    date:{
                        endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
                    }
        }
    })
     
    const countofAbsentsYear=await client.attendance.count({
        where:{
            studentId: id,
                    classId: classId, 
                    absent:true,
        }   
    })
    const countofLeavesYear=await client.attendance.count({
        where:{
            studentId: id,
                    classId: classId, 
                     
                    leave:true,
        }   
    })
    const countofPresentYear=await client.attendance.count({
        where:{
            studentId: id,
                    classId: classId, 
                    present:true,
        }  
    })
    const countofAbsents=await client.attendance.count({
        where:{
            studentId: id,
                    classId: classId, 
                    date:{
                        endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
                    },
                    absent:true,
        }   
    })
    
    
    const countofLeaves=await client.attendance.count({
        where:{
            studentId: id,
                    classId: classId, 
                    date:{
                        endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
                    },
                    leave:true,
        }   
    })
    
    const countofPresent=await client.attendance.count({
        where:{
            studentId: id,
                    classId: classId, 
                    date:{
                        endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
                    },
                    present:true,
        }  
    })
    
    
    const perce=((countofPresent/all)*100).toFixed(2);
    
    
    const updatedNew=await client.attendance.update({
        where:{
            studentId_classId_date: {
                studentId: id,
                classId: classId,
                date:date
            },
        },
        data:{
    countOfAbsents:countofAbsents,
    countofLeaves:countofLeaves,
    AttendancePercent:Number(perce),
    countofPresent:countofPresent,
    countOfAbsentsYear:countofAbsentsYear,
    countofLeavesYear:countofLeavesYear,
    countofPresentYear:countofPresentYear
        }
    })
    console.log("counting: ",countofPresent,countofAbsents,countofLeaves,all,perce);
    return NextResponse.json(updatedNew);
    
}



const newAttendence=await client.attendance.create({
    data:{
        studentId:id,
        classId:classId,
        present:isPresent,
absent:isAbsent,
leave:isOnLeave,
topic:topic,
date:date,
reason:reason,
fine:fine,
due:due

    }
})

const all=await client.attendance.count({
    where:{
        studentId: id,
                classId: classId, 
                date:{
                    endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
                }
    }
})
const countofAbsentsYear=await client.attendance.count({
    where:{
        studentId: id,
                classId: classId, 
                absent:true,
    }   
})
const countofLeavesYear=await client.attendance.count({
    where:{
        studentId: id,
                classId: classId, 
                 
                leave:true,
    }   
})
const countofPresentYear=await client.attendance.count({
    where:{
        studentId: id,
                classId: classId, 
                present:true,
    }  
})

const countofAbsents=await client.attendance.count({
    where:{
        studentId: id,
                classId: classId, 
                date:{
                    endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
                },
                absent:true,
    }   
})


const countofLeaves=await client.attendance.count({
    where:{
        studentId: id,
                classId: classId, 
                date:{
                    endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
                },
                leave:true,
    }   
})

const countofPresent=await client.attendance.count({
    where:{
        studentId: id,
                classId: classId, 
                date:{
                    endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
                },
                present:true,
    }  
})


const perce=((countofPresent/all)*100).toFixed(2);


const updatedNew=await client.attendance.update({
    where:{
        studentId_classId_date: {
            studentId: id,
            classId: classId,
            date:date
        },
    },
    data:{
countOfAbsents:countofAbsents,
countofLeaves:countofLeaves,
AttendancePercent:Number(perce),
countofPresent:countofPresent,
countOfAbsentsYear:countofAbsentsYear,
countofLeavesYear:countofLeavesYear,
countofPresentYear:countofPresentYear
    }
})
console.log("counting: ",countofPresent,countofAbsents,countofLeaves,all,perce);
return NextResponse.json(updatedNew);





 
}catch(err){
    console.log("[ERROR /api/attendance]",err);
    return new NextResponse("Internal Server Error",{status:500});
}


}