"use client"
import { ArrowUpDown, Check, Loader2, MoreHorizontal, X } from "lucide-react"

import { Preview } from "@/components/preview"
import { cn } from "@/lib/utils"
import { Class, Student,  TeacherAttendance } from "@prisma/client"
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
import axios from "axios"
import { useEffect, useState } from "react"
import { useTeacherAttendanceDateState } from "@/app/hooks/useTeacherAttendanceDate"
import { useInView } from "react-intersection-observer"
import { toast } from "sonner"
import TimePicker from "@/components/TimePicker"
import { attachReactRefresh } from "next/dist/build/webpack-config"
export type Teacher = {
  id  :number  
  firstName  :        string
  lastName           :string 
  clerkId :           string                
  imageUrl          : string
  email  :string  
}
 
export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey:"firstName",
    header:(row)=>(<div
    className="text-customLight">Name</div>),
    cell:({row})=>{
      const lastName=row.original.lastName;

      return <div
      className="text-customLight">{row.original.firstName+" "+lastName}</div>
    }
  },{
    accessorKey:'Status',
    header:()=>(<div
    className="text-customLight">Status</div>),
    cell:function Cell({row}){
      const {AttendanceDate}=useTeacherAttendanceDateState()
 
const [isPresentG ,setIsPresent]=useState<boolean|undefined>(undefined);
const [isAbsentG,setIsAbsent]=useState<boolean|undefined>(undefined);
const [loading,setLoading]=useState(false);

const fetchData=(isAbsent:boolean|undefined,isPresent:boolean|undefined)=>{
 setLoading(true);
  axios.post("/api/teacherAttendance",{
    TeacherId:row.original.id,
    isPresent:isPresent ,
    arrival:"",
    departure:"",
    isAbsent:isAbsent ,
    clerkId:row.original.clerkId,
    date:AttendanceDate,
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
const {ref}=useInView({
  triggerOnce:true,
  threshold:0.1,
  onChange:(inview)=>{
    if(inview){
      fetchData(undefined,undefined);
    }
  }
})

useEffect(()=>{
setIsAbsent(undefined)
setIsPresent(undefined)
fetchData(undefined,undefined);
},[AttendanceDate])

 
      return <div
      className="relative
    flex
    flex-row"
      ref={ref}>
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
   cell:function Cell({row}){
    const {AttendanceDate}=useTeacherAttendanceDateState()
 const [arrival,setArrival]=useState<string>("");
 const [loading,setLoading]=useState(false);
 
 
    const fetchData=()=>{
      setLoading(true);
      axios.post("/api/teacherAttendance",{
        TeacherId:row.original.id,
        arrival:arrival,
        departure:"",
        clerkId:row.original.clerkId,
        date:AttendanceDate,
      }).then((res)=>{
        console.log("the response",res.data);
   setArrival(res.data.Arrival) 
      }).catch((err)=>{
        console.log("[err management_sync/app/(dashboard)/teacherManagement/_components/NewAttendanceColumns.tsx]",err)
      }).finally(()=>{
        setLoading(false);
      })
    }
    const {ref}=useInView({
      triggerOnce:true,
      threshold:0.1,
      onChange:(inview)=>{
        if(inview){
          fetchData();
        }
      }
    })
    
    useEffect(()=>{
     setArrival("")
     fetchData();
      },[AttendanceDate])

    return <div
    className="relative
    flex
    flex-row"
    ref={ref}>
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
  const [departure,setDeparture]=useState<string>("");
 const [loading,setLoading]=useState(false);
      const fetchData=()=>{
        setLoading(true);
       axios.post("/api/teacherAttendance",{
         TeacherId:row.original.id,
         arrival:"",
         departure:departure,
         clerkId:row.original.clerkId,
         date:AttendanceDate,
       }).then((res)=>{
         console.log("the response",res.data);
    setDeparture(res.data.departure)
   
       }).catch((err)=>{
         console.log("[err management_sync/app/(dashboard)/teacherManagement/_components/NewAttendanceColumns.tsx]",err)
       }).finally(()=>{
        setLoading(false);
       })
     }
     const {ref}=useInView({
       triggerOnce:true,
       threshold:0.1,
       onChange:(inview)=>{
         if(inview){
           fetchData();
         }
       }
     })
     
     useEffect(()=>{
      fetchData();
      setDeparture("")
       },[AttendanceDate])
  
     
 
     return <div
     className="relative
     flex
     flex-row"
     ref={ref}>
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
 
       fetchData={fetchData}
       value={departure}
       onChange={setDeparture}
       key={"nothing"}/>
     </div>
    }
   }
   ]
