"use client"
import { ArrowUpDown, Loader2, MoreHorizontal } from "lucide-react"

import { Preview } from "@/components/preview"
import { cn } from "@/lib/utils"
import { Class, Student } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format, parse } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
 
export type Attendance = {
  id: number,
date:   string,
reason :String |null
present: boolean
absent: boolean
leave: boolean
topic: String       
student:   Student 
studentId: number
class :    Class 
classId  : number
}


export const columns: ColumnDef<Attendance>[] = [
   {
    accessorKey:"roll",
    header:"Roll#",
    accessorFn:(row)=>{
      return row.student.id
    },
     
  
  }
  ,
  {
    accessorKey: "Name",
    header: "Name",
    accessorFn:(row)=>{
      return row.student.Name
    }
    
  },
  {
    accessorKey:'Obtained marks',
    accessorFn:(row)=>{
return row.reason;
    },
    header:'Obtai.marks',
    cell:({row,table,column,getValue})=>{
 
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
  studentId:row.original.studentId,
  classId:row.original.classId,
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
      disabled={
        !Total||
        !Topic?.length||isSubmitting||row.original.absent||row.original.leave}
value={value}
onChange={(v)=>setValue(Number(v.target.value))}
onBlur={handleBlur}
      type="number"
      placeholder="enter marks"
      /></div>
    }
    
  },
  
  {
    accessorKey: "Status",
    accessorFn:(row)=>{
      return row.present
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=>{
      const isAbsent = row.original.absent;
      const isPresent = row.original.present;
      const isLeave = row.original.leave;
  
      const attendanceStatus =
        isAbsent ? 'Absent' : isPresent ? 'Present' : isLeave ? 'Leave' : 'Attendance not marked';
  
      return <div
      className={cn(
        isAbsent&&'text-red-600',
        isPresent&&'text-green-700',
        isLeave&&'text-sky-400 '

      )}
      
      >{attendanceStatus}</div>;
    
    }
  }, 
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=>{
      const dateValue:string = row.getValue('date');

       
       
        return <div>{dateValue}</div>;
      
  }
  },
  
]
