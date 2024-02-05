import client from "@/lib/prismadb"

const getClassesByTeacherId=async(id:number)=>{

const Classes=await client.class.findMany({
    where:{
        teacherid:id
    },
    include:{
        students:true,
        attendence:{
            include:{
                student:true,
                class:true,  }
        },
        Grade:{
            include:{
                class:true,
                student:true
            }
        }
        
    }
})

return Classes;
}

export default getClassesByTeacherId;