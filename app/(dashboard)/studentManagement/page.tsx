"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, PlusCircle } from "lucide-react";
import { Suspense, lazy, useEffect, useState } from "react"; 
const AdmissionForm=lazy(()=>import("./_components/AdmissionForm"));
 import MainTable from "./_components/MainTable";
import { useStudentEditState } from "@/app/hooks/useStudentEditState";
import { useAllStudentState } from "@/app/hooks/AllStudentState";
import { ftruncate } from "fs";
import { useMyInfo } from "@/app/hooks/usemyInfo";
const StudentManagement=()=>{
    const {admin,fetchInfo}=useMyInfo()
    
   useEffect(()=>{
fetchInfo()
   },[])
    const {edit,profile,setEdit}=useStudentEditState()
      
 


 
  
    
  
    
  


    return <div className="flex 
bg-customDark
    flex-col p-3">
       
   <Button
     disabled={!admin}
   variant={"default"}

   onClick={()=>{
setEdit(!edit)}}
   className="flex
   w-full
   items-center
   justify-center
   flex-row
   gap-x-2
   hover:bg-customGray
   bg-customTeal
   "> {edit?(<>Cancel</>):(<><PlusCircle/>New Admission</>)}</Button>   
   
   <div
   className="flex
   mt-4
   rounded-lg
   fex-col
   w-full
   bg-customGray
   relative">
   { (edit)&&
   
   <Suspense
    fallback={
        <div
        className="absolute
        flex
        flex-col
        w-full
        h-full
        ">
<Loader2
className="text-customTeal
w-8
h-8
animate-spin"/>

        </div>
    }>
   <AdmissionForm
profile={profile}
   onChange={setEdit}  />
   </Suspense>}
   </div>
   <div>
   <MainTable
  
   />
   </div>
 
    </div>
}

export default StudentManagement;