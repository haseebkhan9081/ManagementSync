"use client";
import { Attendance, Class, Grade, Student } from "@prisma/client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import MainTable from "./MainTable";
import {   columns } from "./columns"
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import GradeMainTable from "./GradeMainTable";
import { Check, CheckCheck } from "lucide-react";

interface MainProps{
   
}

const Main:React.FC<MainProps>=({
     
})=>{
const [isNew,setIsNew]=useState(false);
     

    return  <div
    className="p-6
    flex
    flex-col">
      <div
      className="flex 
      flex-col
      
      ">
       <div
       className="mb-2
       flex 
       w-full
       flex-col
       "> {isNew?(
        <div
        className=" 
        flex
        flex-col">
<Button
 type="button"
 onClick={()=>setIsNew(false)}
 >Done</Button>
<div
className="
mt-2
transition
duration-500">
         <MainTable
         //@ts-ignore
         sections={sections as MainProps['sections']}
         />
     </div>
     </div>

        ):(
          
          <Button
          type="button"
          onClick={()=>setIsNew(true)}
          >New Test</Button>
        )}
        </div>

     </div>
     <div
     className="">
      <div
      className="flex
      mb-2
      flex-row
      w-full
      items-center
      gap-x-3">
      <h1
      className="
      text-2xl
      text-slate-800
      font-bold
      ">All Grades</h1>
      <Check
      className="h-8 w-8
      "/>
      </div>
     <GradeMainTable
     
      
     />
     </div>
      </div>
}

export default Main;