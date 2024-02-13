"use client";
import { Attendance, Class, Student } from "@prisma/client"
import { Grade, columns } from "./GradeColumns"
import { DataTable } from "./Gradedata-table"
import { useEffect, useState } from "react";
import Select from "@/components/fancy-multi-select";
import DatePicker from "@/components/datePicker";
import { Input } from "@/components/ui/input";
import { format, formatDistance } from "date-fns";

 
interface MainTableProps{
   
}
const GradeMainTable:React.FC<MainTableProps>=({
     
})=> {
  const [classId,setClassId]=useState<Record<string,any>>({value:0,label:"Please Select a Section to view grades"})
 
 

const [studentsToDisplay,setstudentsToDisplay]=useState(sections?.find((section)=>section.id===classId.value))
 
useEffect(()=>{
setstudentsToDisplay(sections?.find((section)=>section.id===classId.value))
},[classId])

const [testName,setTestName]=useState("");
 console.log("the data we sedning to datatable",studentsToDisplay);
 
 
 return (
    <div>
    <div
    className="
    flex
    flex-row
    w-full
    gap-x-2">
      <div
      className=" 
      z-0
      flex
      w-full
      flex-col">
      <Select
      value={classId}
      options={sections?.map((section)=>(
        {
          value:section?.id,
          label:section.name+' '+section?.subject
        }))}
         onChange={(v)=>{
          setClassId(v);
         }}
         isSingle={true}
         label="Section"
      />
      </div>
      </div>




     <div
     className="flex mt-2 gap-x-2 flex-row
     w-full
     justify-between"> 
      
       
      </div>
    <div className="w-full">
       
      <DataTable columns={columns}     data={studentsToDisplay?.Grade||[]} />
    </div>
    </div>
  )
}
export default GradeMainTable;