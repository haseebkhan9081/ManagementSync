"use client"
import { ArrowUpDown, Check, Loader2, MoreHorizontal, X } from "lucide-react"

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
import is from "date-fns/locale/is/index.js"
import { useEffect, useState } from "react"
import axios from "axios"
import { useMyInfo } from "@/app/hooks/usemyInfo"
import { useAttendanceData } from "@/app/hooks/useAttendanceData"
 
export type Attendance = {
  id: number,
date:   string,
reason :String |null
present: Boolean
absent: Boolean
leave: Boolean
topic: String       
student:   Student 
studentId: number
classId  : number
fine  :number
due :boolean
  payed :boolean
}


export const columns: ColumnDef<Attendance>[] = [
 
   
  {
    accessorKey:"roll",
    header:(row)=>{
      return (
        <div className="flex  text-customLight flex-row gap-x-2 items-center">
        Roll
         
        </div>
      )
    },
    accessorFn:(row)=>{
      return row.student.id
    },
    cell:({row})=>{
      return <div
      className="
      text-customLight">{row.getValue("roll")}</div>
    },
    enableColumnFilter:true,
    enableGlobalFilter:true,
  
  }
  ,
  {
    accessorKey: "Name",
    header: ( )=>{
return <div
className="text-customLight">Name</div>
    },
    accessorFn:(row)=>{
      return row.student.Name
    },
    cell:({row})=>{
      return <div
      className="
      text-customLight">{row.getValue("Name")}</div>
    }
    
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-customLight"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=>{
      const dateValue:string = row.getValue('date');

       
       
        return <div
        className="text-customLight">{dateValue}</div>;
      
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
          className="text-customLight"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:function Cell({row}){
      
    const updateStatus=(p:boolean,l:boolean,a:boolean)=>{
     setLoading(true);
      axios.post("/api/attendance",{
            topic:row.original.topic,
            isAbsent:a,
            isOnLeave:l,
            fine:row.original.fine,
            isPresent:p,
            classId:row.original.classId,
            id:row.original.studentId,
            date:row.original.date,
            reason:row.original.reason,
            due:row.original.due
      }).then((res)=>{
        setIsAbsent(res.data.absent)
        setIsPresent(res.data.present)
        setIsLeave(res.data.leave)
      }).catch((err)=>{
        console.log("attendance/columns",err)
      }).finally(()=>{
        setLoading(false);  
    })
    }
const {teacherId}=useMyInfo();
const {sections}=useAttendanceData();
const [disabled,setDisabled]=useState(false);
useEffect(()=>{
const filter=sections?.filter((s)=>s.id===row.original.classId)?.[0]?.teacherid;
if(filter!==teacherId){
setDisabled(true)
}
},[row.original.classId])
      const [isAbsent,setIsAbsent]=useState(row.original.absent);
      const [isPresent,setIsPresent]=useState(row.original.present);
      const [isLeave,setIsLeave]=useState(row.original.leave);
      const [loading,setLoading]=useState(false); 
      const attendanceStatus =
        isAbsent ? 'Absent' : isPresent ? 'Present' : isLeave ? 'Leave' : 'Attendance not marked';
  


      return <div
       
      ><DropdownMenu
      >
<DropdownMenuTrigger
disabled={disabled}
className={cn('gap-x-2 w-full flex-row flex justify-center items-center',
  isAbsent ? 'text-red-600' : isPresent ? 'text-green-600' : isLeave ? 'text-sky-600' : 'text-customLight',
)}

>{loading&&<Loader2
className="w-4 h-4 animate-spin text-customTeal "
/>} {attendanceStatus}</DropdownMenuTrigger>
<DropdownMenuContent

>
 <DropdownMenuItem
 onClick={()=>{
  updateStatus(true,false,false)
 setIsAbsent(false)
 setIsPresent(true)
 setIsLeave(false)

 
  
 }}>Present  </DropdownMenuItem>
<DropdownMenuItem
className=" "
onClick={()=>{
updateStatus(false, false, true)
  setIsPresent(false)
 setIsLeave(false)
 setIsAbsent(true)
}}
>Absent</DropdownMenuItem>
<DropdownMenuItem
className=" "
onClick={()=>{
  updateStatus(false, true, false)
  setIsAbsent(false)
 setIsLeave(false)
 setIsPresent(true)

   
 
}}
>Leave</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu></div>;
    
    }
  }, 
  {
    accessorKey:'reason',
    header:()=>(<div
    className="text-customLight">Reason</div>),
    cell:({row})=>{
      return <div
      className="text-customLight">{row.getValue("reason")}</div>
    }

    
  },
  {
    accessorKey: "topic",
    header: ()=>(<div
    className="text-customLight">Topic</div>),
    cell:({row})=>{
      return <div
      className="rounded-lg "><Preview
      setBlur={()=>{}}
      
      value={row.getValue("topic")}/></div>
    }
  }, 
  {
    accessorKey:'fine',
    header: ()=>(<div
    className="text-customLight">Fine</div>),
    cell:({row})=>{
      return <div
      className="text-customLight">{row.getValue("fine")}</div>
    }
    
  },
]
