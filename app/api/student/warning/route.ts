export const dynamic = 'force-dynamic';
 import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(){

    // endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
  
try{
const {userId}=auth();
const today=new Date();
const formattedDate=format(today,'dd.MM.yyyy');
const currentMonth = today.getMonth() + 1; // Months in JavaScript are 0-indexed
  const currentYear = today.getFullYear();
if(!userId){

    return new NextResponse("unauthorized",{status:400});
}

await client.student.updateMany({
    where: {
      ReliveMonth: { not: currentMonth },
    },
    data: {
      ReliveCounter: 0,
      ReliveMonth: currentMonth,
    },
  });

const studentsWithThreeOrMoreAbsents =  await client.student.findMany({where:{
    DeActive:false,
    attendances:{
        some:{
            absent:true,
            leave:false,
            date:{endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
        }
        }
    },
    
},
include:{attendances:{
    where:{
        leave:false,
        absent:true,
        present:false
    },
    include:{
        class:true
    }
}
}
})


const filterAbsents=studentsWithThreeOrMoreAbsents.filter(st=>(st.attendances.length-(st.ReliveCounter||0)*3)>=3);


const studentsWithFourOrMoreLeaves =  await client.student.findMany({where:{
   DeActive:false
    , attendances:{
        some:{
            leave:true,
            absent:false,
            date:{endsWith:`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`,
        }
        }
    },
    
},
include:{
    attendances:{
        where:{
            leave:true,
            absent:false,
            present:false
        },
        include:{
            class:true
        }
    }
    
}
}) 

const filterleaves=studentsWithFourOrMoreLeaves.filter(st=>(st.attendances.length-(st.ReliveCounter||0)*4)>=4);

const uniqueStudentIds = new Set();

     
filterleaves.forEach((student) => {
        uniqueStudentIds.add(student.id);
      });
    
      filterAbsents.forEach((student) => {
        uniqueStudentIds.add(student.id);
      }); 

    const numberOfUniqueStudents = uniqueStudentIds.size;

console.log(filterAbsents?.[0])
return NextResponse.json( {
    filterleaves,
    filterAbsents,
    no:numberOfUniqueStudents
})

}   catch(err){

    console.log("[management_sync/app/api/student/warning/route.ts",err);

    return new NextResponse("Internal server Error",{status:500});
} 
}

