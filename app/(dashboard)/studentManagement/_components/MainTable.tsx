"use client"; 
import { Student, columns } from "./columns"
import { DataTable } from "./data-table"
import { Suspense, lazy, useState } from "react"; 
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAllStudentState } from "@/app/hooks/AllStudentState";
const StudentModal=lazy(()=>import("./StudentProfileModal"))
import { useStudentProfileState } from "@/app/hooks/ProfileModalState";
interface MainTableProps{
   
}
const MainTable:React.FC<MainTableProps>=({
   
})=> { 
  const {data,fetchData,setData,loading}=useAllStudentState();
 
const handlefetchData=()=>{ 
 fetchData()
}

const [ref,inView]=useInView({
   threshold:0.5,
   triggerOnce:true,
   onChange:(inView)=>{
    if(inView){
      handlefetchData();}
   }
});
const {isOpen,setIsOpen,profile}=useStudentProfileState();
  return (
    <div ref={ref}
    className="">
       <div>
        
    <div  className="   relative py-10 ">
      {loading&&<><div
      className="absolute
      rounded-lg
        w-full
        h-full
        justify-center
        items-center
        flex
        flex-col
      "
      >
        <Loader2
        className="
         w-8
         h-8
         text-customTeal
        animate-spin"/>
        </div></>}
        <div
        className="z-50">
          <Suspense
          fallback={<div> <Loader2 className="
          text-customTeal animate-spin"/></div>}
          >
         {isOpen && <StudentModal
          profile={profile}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          />}
          </Suspense>
      <DataTable   columns={columns} data={data} />
      </div>
    </div>
    </div>
    </div>
  )
}
export default MainTable;