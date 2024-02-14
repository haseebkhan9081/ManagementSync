"use client";
import RoleRequest from "@/app/(dashboard)/roles/_components/RoleRequest";
import StudentCard from "@/app/(dashboard)/studentManagement/_components/StudentCard";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
   
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog" 
import { useRouter } from "next/navigation";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";
import axios from "axios"; 
import { toast } from "sonner";
import { useMyInfo } from "@/app/hooks/usemyInfo";
  
interface RoleModalProps{
    children:React.ReactNode;
   firstName:string;
   lastName:string;
   email:string;
   imageUrl:string;
   admiN:boolean;
   teacher:boolean;
   visitor:boolean;
   id:string


    

}

  const RoleModal=({
    id,
children,
email,
firstName,
lastName,
imageUrl,
admiN,
teacher,
visitor
  }:RoleModalProps)=>{ 
    const {admin,fetchInfo}=useMyInfo()
    useEffect(()=>{
fetchInfo();
    },[])
const router=useRouter();
const [t,setT]=useState(teacher);
const [a,setA]=useState(admiN);
const [v,setV]=useState(visitor);
console.log("id recived here in the RoleModal",id);
const onClick=()=>{
  axios.post(`/api/id`,{
    id,
    firstName,
    lastName,
    imageUrl,
    teacher:t,
    admin:a,
    visitor:v,
    email
  }).then(()=>{
     toast.success("permission updated!")
  }).catch((err)=>{
    console.log("ERROR RoleModal",err);
    toast.error(`could not update permission` )
  }).finally(()=>{
    router.refresh();
  })
}


return (
  <div
  className="">

 
<AlertDialog>
  <AlertDialogTrigger asChild>
    {children}
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader className="flex flex-col justify-between">
       <RoleRequest
       email={email}
       firstName={firstName}
       lastName={lastName}
       imageUrl={imageUrl}
       />
       <div className="flex flex-col">
<div className="flex text-lg text-slate-800 items-center gap-x-3 flex-row">
<p
className="">Admin</p>
<Switch 
className="ml-1.5"
checked={a}
onCheckedChange={(v)=>{setA(v)
 
}}
/>
<p className="
text-sm
text-slate-800
">An Admin is the supe user they will assign teacher ,create classes,students and give other users the permission to access this data! </p>

</div>
<div className="flex text-lg text-slate-800 items-center gap-x-3 flex-row">
<p>Teacher</p>
<Switch
checked={t}
onCheckedChange={(v)=>{setT(v)
 
}}
/>
<p className="
text-sm text-slate-800">A teacher can take attendance of their classes and see information</p>
</div>
<div className="flex text-lg text-slate-800 items-center gap-x-3 flex-row">
<p>Visitor</p>
<Switch
className="ml-2"
onCheckedChange={(v)=>{setV(v)
 
}}
checked={v}
/>
<p className="
text-sm
text-slate-800
">A visitor may only see information intended for them</p>
</div>

       </div>
    </AlertDialogHeader>
    <AlertDialogFooter className="flex flex-row justify-between items-center">
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction 
      
      onClick={onClick} >Save Changes
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
</div>


);
  }

  export default RoleModal;