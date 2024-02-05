import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(){


try{
const {userId}=auth();
const today=new Date();
const formattedDate=format(today,'dd.MM.yyyy');
const currentMonth = today.getMonth() + 1; // Months in JavaScript are 0-indexed
  const currentYear = today.getFullYear();
if(!userId){

    return new NextResponse("unauthorized",{status:400});
}
const allFineDue=await client.attendance.aggregate({
    _sum:{
        fine:true
    },
    where:{
        student:{
DeActive:false,
        },
        due:true,
        date:{
            endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
        }
    }
})

const fineDueMyClass=await client.attendance.aggregate({
    _sum:{
        fine:true
    },
    where:{
        student:{
            DeActive:false
        },
        due:true,
        date:{
            endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
  
        },
        class:{
            teachers:{
                clerkId:userId!
            }
        }
    }
})

const collectedByMe=await client.attendance.aggregate({
    _sum:{
        fine:true
    },
    where:{
        student:{
            DeActive:false
        },
        payed:true,
        date:{
            endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
  
        },
        class:{
            teachers:{
                clerkId:userId!
            }
        }
    }
})

const collectedByEveryOne=await client.attendance.aggregate({
    _sum:{
        fine:true
    },
    where:{
        student:{
            DeActive:false
        },
        payed:true,
        date:{
            endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
        }
    }
})
const allFineDueProfile = await client.attendance.groupBy({
    by: ['studentId'],
    where: {
        student:{
            DeActive:false
        },
        due: true,
        date: {
            endsWith: `.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
        }
    },
    _sum: {
        fine: true
    },
    orderBy: {
        studentId: 'asc'
    }
});

console.log(allFineDueProfile);

const studentIds = allFineDueProfile.map(entry => entry.studentId);

const studentsWithDetails = await client.student.findMany({
    where: {
        DeActive:false,
        id: {
            in: studentIds,
        },
    },
    include: {
        classes: true,
    },
});

// Create a map for easy lookup
const studentMap = new Map(studentsWithDetails.map(student => [student.id, student]));

// Merge the information from the initial query and the additional query
const result = allFineDueProfile.map(entry => ({
    studentId: entry.studentId,
    totalFine: entry._sum.fine || 0, // Replace 'fine' with your actual field name
    student: studentMap.get(entry.studentId),
}));

console.log(result[0]);


return NextResponse.json({
    DueAll:allFineDue._sum.fine||0,
    MyDue:fineDueMyClass._sum.fine||0,
    collectedAll:collectedByEveryOne._sum.fine||0,
    MyCollect:collectedByMe._sum.fine||0,
    profile:result||[]
})


}   catch(err){

    console.log("[management_sync/app/api/student/fine/route.ts]",err);

    return new NextResponse("Internal server Error",{status:500});
} 
}