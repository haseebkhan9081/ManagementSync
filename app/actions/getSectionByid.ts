import client from "@/lib/prismadb"

const getSectionById=async(id:number)=>{


const section=await client.class.findUnique({
    where:{
        id:Number(id)
    },
    include:{
        teachers:true,
        students:true,
        attendence:true
    }
})

return section;
}

export default getSectionById;