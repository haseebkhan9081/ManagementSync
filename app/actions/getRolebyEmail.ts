import { auth, useAuth } from "@clerk/nextjs"
import db from "@/lib/prismadb";
import { User } from "@prisma/client";
const getRolebyEmail=async(email:string|undefined)=>{
    const {userId }=auth();
if(!userId||!email){
    return null;
}


const user:User|null=await db.user.findUnique({
    where:{
        email:email
    }
})
return user;

}
export default getRolebyEmail;