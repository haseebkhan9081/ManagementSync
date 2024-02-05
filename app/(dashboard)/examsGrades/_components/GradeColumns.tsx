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
 
export type Grade = {
    id   :number,
    value:number, 
    Total: number,
    Topic :string,
    Date :string
    student:   Student 
    studentId: number
    class   :  Class   
    classId   :number,
    percent:number
        
}


export const columns: ColumnDef<Grade>[] = [
      
  {
    accessorKey:"roll",
    header:"Roll#",
    accessorFn:(row)=>{
      return row.student.id
    },
     
  
  },
  {
        accessorKey:'Name',
        accessorFn:(row)=>{
          return row.student.Name
        },
        header:"Name"
      },
      {
        accessorKey:"Marks",
        header:"Obt.Marks",
        accessorFn:(row)=>{
      return row.value
        },
        cell:({row,table,column,getValue})=>{
 
          let Total=row.original.Total;
        const Topic=row.original.Topic;
         const date=row.original.Date;
    const router=useRouter()
          const [value,setValue]=useState(row.original.value);
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
      router.refresh();
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
            isSubmitting}
    value={value}
    onChange={(v)=>setValue(Number(v.target.value))}
    onBlur={handleBlur}
          type="number"
          placeholder="enter marks"
          /></div>
        }
      },
      {
accessorKey:"percent",
header:"Percent",
cell:({row})=>{
  const percent = row.original.percent;
  const formattedPercent = (percent * 100).toFixed(2) + "%";
  
  return <div>{formattedPercent}</div>
}

      },
      {
        accessorKey:'Total',
        header:"Total"
      },
      {
        accessorKey:'Date',
        header:"Date"
      },
      {
        accessorKey:"Topic",
        header:"Topic"
      }, 
]
