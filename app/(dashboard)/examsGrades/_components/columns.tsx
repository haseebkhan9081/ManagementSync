"use client"
import { ArrowUpDown, Loader2, MoreHorizontal } from "lucide-react"
 
import { Class, Student } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format, parse } from "date-fns"
import { Button } from "@/components/ui/button" 
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
 
 


export const columns: ColumnDef<Student>[] = [
   {
    accessorKey:"roll",
    header:( )=>{
      return <div className="flex text-customLight flex-row items-center justify-between">
        <div>Roll</div> 
      </div>
    },
    accessorFn:(row)=>{
      return row.id
    },
    cell:({row})=>{
return <div
className="text-customLight">{row.original.id}</div>
    }
     
  
  }
  ,
  {
    accessorKey: "Name",
    header:()=>{
      return <div className="flex text-customLight flex-row items-center justify-between">
        <div>Name</div>
      </div>
    },
    accessorFn:(row)=>{
      return row.Name
    },
    cell:({row})=>{
      return <div
className="text-customLight">{row.original.Name}</div>
    }
    
  },
  {
    accessorKey:'Obtained marks',
    accessorFn:(row)=>{
return row.id;
    },
    header:()=>{
      return <div className="flex text-customLight flex-row items-center justify-between">
        <div>Obtained marks</div>
      </div>
    },
    cell:function Cell({row,table}){
 
      let Total=table?.options?.meta?.total;
    const Topic=table?.options?.meta?.topic;
     const date=table?.options?.meta?.date;

      const [value,setValue]=useState(0);
    const [isSubmitting,setIsSubmitting]=useState(false);
    if(!Total){
      Total=0;
    } 
 
    console.log("topic",Topic);

    const percent=(value/Total);
     const handleBlur=()=>{
      if(!Topic?.length){
        console.log("topic",Topic);
toast.error("Topic can not be Empty!");
return ;    
}else if(value>Total!){
toast.error("Obtained Marks can not be greater than Total Marks");
  return;    }
setIsSubmitting(true);

axios.post("/api/grades",{
  studentId:row.original.id,
  classId:table.options.meta?.sectionId,
  Total,
  value,
  Topic,
  date,
  percent
}).then((response)=>{
  toast.success("Saved!");
}).catch((err)=>{
  toast.error("error saving!");
}).finally(()=>{
  setIsSubmitting(false);
})

     }
      return <div
      className="flex
      flex-row-reverse
      w-full
      items-center
      justify-between
      ">
        {isSubmitting&&(
          <Loader2
          className="w-4 h-4 animate-spin"/>
        )}
        <Input
        className="
        focus-within:ring-0
        focus-within:ring-offset-0
        focus-visible:ring-0
        focus-visible:ring-offset-0
        bg-customLight
        text-customGray"
      disabled={
        !Total||
        !Topic?.length||isSubmitting}
value={value}
onChange={(v)=>setValue(Number(v.target.value))}
onBlur={handleBlur}
      type="number"
      placeholder="enter marks"
      /></div>
    }
    
  },
  
   
   
  
]
