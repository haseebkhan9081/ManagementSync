"use client"
import { ArrowUpDown, Check, Loader2, MoreHorizontal, X } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Class, Student,  Teacher,  TeacherAttendance } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" 
import axios from "axios"
import { useEffect, useState } from "react"
import { useTeacherAttendanceDateState } from "@/app/hooks/useTeacherAttendanceDate"
  
import TimePicker from "@/components/TimePicker"
import { useMyInfo } from "@/app/hooks/usemyInfo"
 
export const columns: ColumnDef<TeacherAttendance&{
    teacher:Teacher
}>[] = [
  {
    accessorKey:"Name",
    accessorFn:(row)=>{
        return row.teacher.firstName
      },
    header:(row)=>(<div
    className="text-customLight">Name</div>),
    cell:({row})=>{
      const lastName=row.original.teacher.lastName;

      return <div
      className="text-customLight">{row.original.teacher.firstName+" "+lastName}</div>
    }
  },{
    accessorKey:'Status',
    header:()=>(<div
    className="text-customLight">Status</div>),
    cell:function Cell({row,}){
      
const [isPresentG ,setIsPresent]=useState<boolean>(row.original.isPresent);
const [isAbsentG,setIsAbsent]=useState<boolean|undefined>(row.original.isAbsent);
const [loading,setLoading]=useState(false);

const fetchData=(isAbsent:boolean|undefined,isPresent:boolean|undefined)=>{
 setLoading(true);
  axios.post("/api/teacherAttendance",{
    TeacherId:row.original.id,
    isPresent:isPresent ,
    arrival:"",
    departure:"",
    isAbsent:isAbsent ,
    clerkId:row.original.teacher.clerkId,
    date:row.original.date,
  }).then((res)=>{
    console.log("the response",res.data);
setIsAbsent(res.data.isAbsent);
setIsPresent(res.data.isPresent);
  }).catch((err)=>{
    console.log("[err management_sync/app/(dashboard)/teacherManagement/_components/NewAttendanceColumns.tsx]",err)
  }).finally(()=>{
    setLoading(false);
  })
}
 

 

 const {admin}=useMyInfo()
      return <div
      className="relative
    flex
    flex-row"
       >
         {loading&&<Loader2
     className="text-customTeal
     animate-spin
     w-4
     h-4
     flex
     flex-col
       "
     />}
        <DropdownMenu
        
         >
  <DropdownMenuTrigger
  disabled={!admin}
className={cn('text-customLight',
    isPresentG&&"text-green-600",
    isAbsentG&&"text-red-600"
  )}
  
  >{isPresentG&&"Present"} {isAbsentG&&"Absent"} {(!isPresentG&&!isAbsentG)&&"undefined"}</DropdownMenuTrigger>
  <DropdownMenuContent
  >
    <DropdownMenuItem
    onClick={()=>{
      fetchData(false,true);
      setIsPresent(true);
      setIsAbsent(false);
    
    }}>Present <Check 
    className="text-green-600"/></DropdownMenuItem>
   <DropdownMenuItem
   className=" "
   onClick={()=>{
    fetchData(true,false);
     setIsAbsent(true);
     setIsPresent(false);
    
  }}
   >Absent <X className="text-red-600"/></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


      </div>
    }

  },

  {
   accessorKey:'clerkId',
   header:(row)=>{
    return <div
    className="text-customLight">
      Arrival
    </div>
   } ,
   cell:function Cell({row,}){ 
  const [arrival,setArrival]=useState<string>(row.original.Arrival);
 const [loading,setLoading]=useState(false);
 
 
    const fetchData=()=>{
      setLoading(true);
      axios.post("/api/teacherAttendance",{
        TeacherId:row.original.id,
        arrival:arrival,
        departure:"",
        clerkId:row.original.teacher.clerkId,
        date:row.original.date,
      }).then((res)=>{
        console.log("the response",res.data);
   setArrival(res.data.Arrival) 
      }).catch((err)=>{
        console.log("[err management_sync/app/(dashboard)/teacherManagement/_components/NewAttendanceColumns.tsx]",err)
      }).finally(()=>{
        setLoading(false);
      })
    }
     
    
    const {admin}=useMyInfo()

    return <div
    className="relative
    flex
    flex-row"
     >
      {loading&&<Loader2
     className="text-customTeal
     animate-spin
     w-8
     h-8
     flex
     flex-col
       "
     />}
      <TimePicker 
        disabled={!admin}
      fetchData={fetchData}
      value={arrival}
      onChange={setArrival}
      key={"nothing"}/>
    </div>
   }
  },
  {
    accessorKey:'clerkId',
    header:(row)=>{
     return <div
     className="text-customLight">
       Departure
     </div>
    } ,
    cell:function Cell({row,}){
     const {AttendanceDate}=useTeacherAttendanceDateState()
  const [departure,setDeparture]=useState<string>(row.original.departure);
 const [loading,setLoading]=useState(false);
      const fetchData=()=>{
        setLoading(true);
       axios.post("/api/teacherAttendance",{
         TeacherId:row.original.id,
         arrival:"",
         departure:departure,
         clerkId:row.original.teacher.clerkId,
         date:row.original.date,
       }).then((res)=>{
         console.log("the response",res.data);
    setDeparture(res.data.departure)
   
       }).catch((err)=>{
         console.log("[err management_sync/app/(dashboard)/teacherManagement/_components/NewAttendanceColumns.tsx]",err)
       }).finally(()=>{
        setLoading(false);
       })
     }
     
     
      
  
     const {admin}=useMyInfo()
 
     return <div
     className="relative
     flex
     flex-row"
      >
     {loading&&<Loader2
     className="text-customTeal
     animate-spin
     w-8
     h-8
     flex
     flex-col
       "
     />}
       <TimePicker
         disabled={!admin}
 
       fetchData={fetchData}
       value={departure}
       onChange={setDeparture}
       key={"nothing"}/>
     </div>
    }
   },{
    accessorKey:"date",
    header:(row)=>(<div
    className="text-customLight">Date</div>),
    cell:({row})=>(
        <div
        className="text-customLight">{row.original.date}</div>
    )
   }
   ]
