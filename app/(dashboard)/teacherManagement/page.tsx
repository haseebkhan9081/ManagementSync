"use client";
import getRolebyEmail from "@/app/actions/getRolebyEmail";
import { auth, clerkClient, useUser } from "@clerk/nextjs";
import { Teacher, User } from "@prisma/client";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import RoleRequest from "../roles/_components/RoleRequest";

const TeacherManagement=()=>{
const {user,isLoaded,isSignedIn}=useUser()
const [roleUser,setRoleUser]=useState<User|null>(null);
 const [teachers,setTeachers]=useState<Teacher[]|null>(null);
useEffect(()=>{
axios.get(`/api/user/${user?.id}`)
.then((response)=>{
 setRoleUser(response.data);
 console.log("user has been fetched now",response.data);
})
.catch((err)=>{
console.log("[ERROR teacherManagement]",err);
})

axios.get("/api/teacher")
.then((response)=>{
setTeachers(response.data);
})
.catch((err)=>{
console.log("[ERROR teacherManagement loading teachers]",err);
})

},[user])




if(!user||!user?.emailAddresses[0]?.emailAddress||!isLoaded||!isSignedIn){
<div
className="flex justify-center w-full
h-screen
items-center">
<Loader2
className="w-6 h-6 text-slate-900 z-50 animate-spin"/>
</div>
}else{
    
if(roleUser?.admin||roleUser?.visitor){
return <div
className="p-3">
    {/* //the section that the admin will see
     */}
    <div
    className="
    mt-2
    flex
    flex-col
    space-y-2

    ">
{teachers?.[0] && 
teachers?.map((teach)=>(
    <RoleRequest
    firstName={teach?.firstName}
    lastName={teach?.lastName}
    email={teach?.email!}
    imageUrl={teach?.imageUrl}
    />
)) }

    </div>

</div>
}else if(roleUser?.teacher){
    return <div>hi teacher</div>
} 
else{
    return   <div
className="flex justify-center w-full
p-6
flex-col
h-screen
items-center">
<Loader2
className="w-12 h-12
text-slate-900 z-50 animate-spin"/>
<div>You will only be able to manipulate
this page if you are an admin or a teacher!
please Ask the admin to grant you permission!</div>
</div>
    
} }
}

export default TeacherManagement;