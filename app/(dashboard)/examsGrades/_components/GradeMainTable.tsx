"use client";
import { Attendance, Class, Student } from "@prisma/client"
import { Grade, columns } from "./GradeColumns"
import { DataTable } from "./Gradedata-table"
import { useEffect, useState } from "react";
import Select from "@/components/fancy-multi-select";
import DatePicker from "@/components/datePicker";
import { Input } from "@/components/ui/input";
import { format, formatDistance } from "date-fns";
import { useAttendanceData } from "@/app/hooks/useAttendanceData";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Loader2 } from "lucide-react";

 
interface MainTableProps{
   
}
const GradeMainTable:React.FC<MainTableProps>=({
     
})=> {
  const [classId,setClassId]=useState<Record<string,any>>({value:0,label:"Please Select a Section to view grades"})
 
  const {sections,fetchSections}=useAttendanceData()
 const [grades,setGrades]=useState<Grade[]>([])
 const [loading,setloading]=useState(false);
 
 const fetchGrades=(id:number)=>{
  setloading(true)
axios.post("/api/grades/get",{
  classId:id,
}).then((response)=>{
  setGrades(response.data);
}).catch((err)=>{
  console.log(err);
}).finally(()=>{
setloading(false)
})
 }
  
 const {ref}=useInView({
  triggerOnce:true,
  threshold:0.1,
  onChange:(inview)=>{
    if(inview){
      fetchSections();
    }
  }
 })
 return (
    <div
    className="bg-customGray
    p-3
    rounded-lg
    z-50">
    <div
    ref={ref}
    className="
    flex
    bg-customGray

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
          fetchGrades(v.value);
         }}
         isSingle={true}
         label="Section"
      />
      </div>
      </div>




     <div
     className="flex   gap-x-2 flex-row
     w-full
     justify-between"> 
      
       
      </div>
    <div className="w-full
    relative">
      {loading&&<div
      className="flex
      flex-col
      justify-center
      items-center
      absolute
      w-full
      h-full">
        <Loader2
        className="text-customTeal
        animate-spin
        z-10
        "
        />
        </div>}
      <DataTable columns={columns}     data={grades} />
    </div>
    </div>
  )
}
export default GradeMainTable;