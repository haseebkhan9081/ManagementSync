import client from "@/lib/prismadb"

const getAllStudents=async()=>{


    const allStudents=await client.student.findMany({
        include:{
            classes:true,
            attendances:true
        }
    });


    return allStudents;

}

export default getAllStudents;