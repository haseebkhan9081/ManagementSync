"use client";
import { Class, Student } from "@prisma/client"
import { Attendance, columns } from "./columns"
import { DataTable } from "./data-table"
import { useState } from "react";
import Select from "@/components/fancy-multi-select";

 
interface MainTableProps{
    sections:(Class&{
      students:Student[],
            attendence:(Attendance&{
              student:Student,
              class:Class
            })[],
    })[]|[]
}
const MainTable:React.FC<MainTableProps>=({
    sections
})=> {
  const [classId,setClassId]=useState<Record<string,any>>({value:0,label:"please select a section to view attendance"})

  return (
    <div>
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
    <div className="   py-10 w-full">
      <DataTable columns={columns} data={sections.find((section)=>section.id===classId.value)?.attendence!||[]} />
    </div>
    </div>
  )
}
export default MainTable;