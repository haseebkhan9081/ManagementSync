import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request){


    try{
const {userId}=auth();
const {
    studentId,
    classId,
    Total,
    value,
    Topic,
    date,
    percent

}=await req.json();

if(!userId){
    return new NextResponse("Unauthorized",{status:400})
}

const existingGrade=await client.grade.findUnique({
    where:{
        Topic_Date_studentId_classId:{
            Topic,
            Date:date,
            studentId,
            classId
        }
    }
})

if(existingGrade){
const updated=await client.grade.update({
    where:{
        Topic_Date_studentId_classId:{
            Topic,
            Date:date,
            studentId,
            classId
        }
    },
    data:{
      percent:percent,
        value,
       
    }
})
const grades=await client.grade.findMany({
    where:{
        studentId:studentId,
        classId:classId
    }
});
let sum=0;
grades.map((g)=>{
     sum+=(g.percent)*100;
})
 const a=sum/grades.length;

const average=await client.average.findUnique({
    where:{
        studentId_classId:{
            studentId,
            classId
        }
    }
})
if(average){
await client.average.update({
    where:{
        studentId_classId:{
            studentId,
            classId
        }
    },
    data:{
        Average:a
    }
})
}else{
const nw=await client.average.create({
    data:{
        Average:a,
        classId:classId,
        studentId:studentId
    }
}); 
} 
return NextResponse.json(updated);
}
const newGrade=await client.grade.create({
    data:{
         studentId,
         classId,
         value,
         Total,
         Topic,
         Date:date,
         percent:percent
    }
})


const grades=await client.grade.findMany({
    where:{
        studentId:studentId,
        classId:classId
    }
});
let sum=0;
grades?.map((g)=>{
     sum+=(g.percent)*100;
})
 const a=sum/grades.length;

const average=await client.average.findUnique({
    where:{
        studentId_classId:{
            studentId,
            classId
        }
    }
})
if(average){
await client.average.update({
    where:{
        studentId_classId:{
            studentId,
            classId
        }
    },
    data:{
        Average:a
    }
})
}else{
const nw=await client.average.create({
    data:{
        Average:a,
        classId:classId,
        studentId:studentId
    }
}); 
}

return NextResponse.json(newGrade);
    }catch(err:any){
        console.log("[ERROR AT api/grades]",err);

        return new NextResponse("Internal Server Error",{status:500});

    }
}