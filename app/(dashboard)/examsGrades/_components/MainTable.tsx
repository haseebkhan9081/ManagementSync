"use client";
import { Class, Student } from "@prisma/client"
import {columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";
import Select from "@/components/fancy-multi-select";
import DatePicker from "@/components/datePicker";
import { Input } from "@/components/ui/input";
import { format, formatDistance } from "date-fns";
import { useAttendanceData } from "@/app/hooks/useAttendanceData";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { useMyInfo } from "@/app/hooks/usemyInfo";

 
interface MainTableProps{
 
}
const MainTable:React.FC<MainTableProps>=({
     
})=> {
  const {teacherId}=useMyInfo()
  const [classId,setClassId]=useState<Record<string,any>>({value:0,label:"please select a section to view attendance"})
  const {sections,fetchSections}=useAttendanceData() 
const [total,setTotal]=useState<number>()
const [testName,setTestName]=useState("");
const [filter,setFilter]=useState<Class[]>([]);
const [students,setStudents]=useState<Student[]>([]);
const [date,setDate]=useState(new Date());
const fetchData=()=>{
fetchSections(); 
}

useEffect(
  ()=>{
const filter=sections?.filter((s)=>s.teacherid===teacherId)
setFilter(filter); 
const st=filter?.filter((section)=>section?.id===classId?.value)?.[0]?.students;
 setStudents(st);
 console.log(st);
},[classId,teacherId]) 

 const {ref}=useInView({
  threshold:0.1,
  triggerOnce:true,
  onChange:(inview)=>{
    if(inview){
      fetchData();
    }
  }
  })
 
  return (
    <div
    ref={ref}
    className="
    
    p-3
    z-50
    rounded-lg

    bg-customGray
    ">
    <div
    className="

    bg-customGray
    rounded-lg
    flex
    flex-row
    w-full
    gap-x-2">
      <div
      className="w-[300px]
      flex
      flex-col">
         {(sections?.length===0)&&<Loader2
      className="animate-spin
      text-customTeal
      w-4 h-4"/>}
      <div>      <Select
      value={classId}
      options={filter?.map((section)=>(
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
      <Input
      value={testName}
      onChange={(v)=>{
        setTestName(v.target.value)
      }}
      className="
      text-lg
      text-customGray
      focus-visible:ring-0
      "
      placeholder="Test Topic"
      />
     </div>




     <div
     className="flex mt-2 gap-x-2 flex-row
     w-full
     justify-between"> 
     <div
     className="flex
     w-[200px]"> <DatePicker
     
      date={date}
      onChange={setDate}
      />
      </div>
      <Input
      value={total}
      type="number"
      className="focus-visible:ring-0"
      placeholder="Total Marks"
      onChange={(v)=>{
        setTotal(Number(v.target.value))
      }}
      />
      </div>
    <div className="w-full">
      <DataTable sectionId={classId.value} columns={columns} date={format(date,'dd.MM.yyyy')} Topic={testName} Total={total!} data={ students} />
    </div>
    </div>
  )
}
export default MainTable;