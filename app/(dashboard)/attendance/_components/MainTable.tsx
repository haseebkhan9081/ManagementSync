"use client"; 
import { Attendance, columns } from "./columns"
import { DataTable } from "./data-table"
import { useState } from "react";
import Select from "@/components/fancy-multi-select";
import axios from "axios"; 
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { useAttendanceData } from "@/app/hooks/useAttendanceData";

 
interface MainTableProps{
     
}
const MainTable:React.FC<MainTableProps>=({
     
})=> {
  const [classId,setClassId]=useState<Record<string,any>>({value:0,label:"please select a section to view attendance"})
   const {sections,fetchSections,loading}=useAttendanceData()
const [attendance,setAttendance]=useState<Attendance[]>([])
const fetchData=()=>{
fetchSections(); 
}

const fetchAttendance=(id:number)=>{

 axios.post("/api/attendance/get",{
   classId:id,
 }).then((response)=>{
setAttendance(response.data);
 }
 ).catch((err)=>{ 
   console.log(err);
 }
 )
}
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
    rounded-lg
    w-full
    h-full
         z-50
         bg-customGray
    ">
      {loading&&<Loader2
      className="animate-spin
      text-customTeal
      w-4 h-4"/>}
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
          fetchAttendance(v.value);
         }}
         isSingle={true}
         label="Section"
       
      
      />
      </div>
    <div className=" relative
       w-full">
      {(attendance?.length===0&&classId.value!=0)&&
      
      <div
      className="
      text-customTeal
      w-full
      h-full
       justify-center
      items-center
      flex 
       
      flex-col
      absolute
      ">
      
      <Loader2
      className="w-8 animate-spin h-8 "/>
      </div>
      }
      <DataTable columns={columns} data={attendance} />
    </div>
    </div>
  )
}
export default MainTable;