import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"; 
import { NextResponse } from "next/server";





export async function GET(req: Request,
    { params }: { params: { studentId: number } }) {
    try {
      const { userId } = auth();
  
      if (!userId || !params.studentId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const student = await client.student.findUnique({
        where: {
          id: Number(params.studentId)
        },
        include:{
            _count:true,
            attendances:true,
            classes:{
                include:{
                    attendence:true,
                    Grade:{include:{
                        class:true
                    },
                        orderBy:{
                           Date:'asc'
                        }
                    },
                }
            },
            grades:true
        }
      });
  
      if (student) {

      return NextResponse.json(student);
      }
  
      return new NextResponse("not found", { status: 404 });
    } catch (err) {
      console.log("[ERROR api/student/[studentid] - GET]", err);
      return new NextResponse("Internal Server error", { status: 500 });
    }
  }
export   async function PATCH(req:Request,
    {params}:{params:{studentId:number}}){
try{

    const {userId}=auth();
    const {name, 
        sections,
        age ,
        FatherName ,
        phone  ,
        imageUrl,
        adress,
    DeActive}=await req.json();
    if(!userId ||!params.studentId ){
       
        return new NextResponse("Unauthorized",{status:401});
    }
    console.log(params);
    console.log("image url recieved bakcend",imageUrl);
    const student=await client.student.findUnique({
        where:{
            id:Number(params.studentId)
        }
    })
    
    if(!student){
        return new NextResponse("not found",{status:404});
    }

    if(DeActive!==undefined){
        await client.student.update({
            where:{
                id:Number(params.studentId)
            },data:{
                DeActive:DeActive
            }
        })
    return NextResponse.json({message:"done"});
    }
    let updatedStudent;
   
      updatedStudent=await client.student.update({
        where:{
            id:Number(params.studentId)
        },
        data:{
            Name:name,
            fatherName:FatherName,
            Contact:phone,
            age:age,
            Address:adress,
            imageUrl:imageUrl,
            classes: {
                connect: sections.map((sec:any) => ({ id: sec.value })),
              },

        }
    });
    if(!updatedStudent){
        return new NextResponse("failed to update",{status:404});
    }

return NextResponse.json(updatedStudent);
}catch(err){
    console.log("[ERROR api/student/[studentid]]",err);
return new NextResponse("Internal Server error",{status:500});
}

}