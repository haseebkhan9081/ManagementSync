import client from "@/lib/prismadb"

const getAllSections=async()=>{


    const allsections=await client.class.findMany({
        include:{
            students:true,
            attendence:true,
            teachers:true
        }
    });


    return allsections;

}

export default getAllSections;