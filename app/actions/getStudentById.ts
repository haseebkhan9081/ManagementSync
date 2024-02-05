import { auth, useAuth } from "@clerk/nextjs"
import db from "@/lib/prismadb";
const getStudentById=async(id:number)=>{
    const {userId }=auth();
if(!userId){
    return null;
}
 

const student=await db.student.findUnique({
    where:{
        id:Number(id)
    },
    include:{
         classes:true,
         attendances:true,
         grades:true    
    }
})
return student;

}
export default getStudentById;