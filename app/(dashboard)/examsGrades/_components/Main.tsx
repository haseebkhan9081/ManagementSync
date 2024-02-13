"use client";
import { Attendance, Class, Grade, Student } from "@prisma/client";
import { format } from "date-fns";
import { Suspense, lazy, useEffect, useState } from "react"; 
const MainTable=lazy(()=>import("./MainTable"))
import {   columns } from "./columns"
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button"; 
import { PlusCircleIcon } from "lucide-react";
const GradeMainTable=lazy(()=>import("./GradeMainTable"))
interface MainProps{
   
}

const Main:React.FC<MainProps>=({
     
})=>{
const [isNew,setIsNew]=useState(false);
     

    return  <div
    className="
    p-3
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
className="
bg-customTeal
hover:bg-customGray
w-full
flex-row

"
 type="button"
 onClick={()=>setIsNew(false)}
 >Done</Button>
<div
className="
mt-4
 ">

  <Suspense
  fallback={<div>loading...</div>}>
         <MainTable
        
          
         />
         </Suspense>
     </div>
     </div>

        ):(
          
          <Button
          type="button"
          className="
          bg-customTeal
          hover:bg-customGray
          w-full
          flex-row
          gap-x-1
          "
          onClick={()=>setIsNew(true)}
          ><PlusCircleIcon
 
          />New Test</Button>
        )}
        </div>

     </div>
     <div
     className="
     mt-6">
    
       <Suspense
       fallback={<div></div>}>
     <GradeMainTable
     
      
     />
     </Suspense>
     </div>
      </div>
}

export default Main;