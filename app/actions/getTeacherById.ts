import client from "@/lib/prismadb"

const getTeacherById=async(id:string)=>{


     const teacher=await client.teacher.findUnique({
        where:{
            clerkId:id
        },
        include:{
            classes:true,
            teacherAttendances:true,
        }
     })
     return teacher
}

export default getTeacherById;