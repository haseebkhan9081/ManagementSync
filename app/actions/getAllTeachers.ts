import client from "@/lib/prismadb"

const getAllTeachers=async()=>{

const allTteachers=await client.teacher.findMany({
    include:{
        classes:true,
        teacherAttendances:true
    }
});

return allTteachers;
}

export default getAllTeachers;