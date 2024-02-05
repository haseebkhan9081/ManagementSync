import client from "@/lib/prismadb"

const getGradesbyClassId=async(id:number)=>{

const Grades=await client.grade.findMany({
    where:{
        classId:id
    }
})

return Grades;
}

export default getGradesbyClassId;