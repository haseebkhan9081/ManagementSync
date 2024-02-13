"use client"
 
import { useAttendanceData } from "@/app/hooks/useAttendanceData"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table" 
import axios from "axios"
import { set } from "date-fns"
import { is } from "date-fns/locale"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react" 
import { toast } from "sonner"
import { Cell } from "recharts"
import { Input } from "@/components/ui/input"
 
 export type StudentNewAttendance = {
  id        : number     
  Name       :string
  age        :string
  imageUrl   :string
  fatherName :string
  Contact    :string
  Address   : string
  ReliveCounter :number
  ReliveMonth :number
  DeActive :boolean
}

export const columnsNewAttendance: ColumnDef<StudentNewAttendance>[] = [
 
  {
accessorKey:"id",
header:(row)=>{
  return (
    <div className="flex  text-customLight flex-row gap-x-2 items-center">
    ID

    </div>
  )
},
cell:({row})=>{
  return <div
  className="
  text-customLight">{row.getValue("id")}</div>
}
  } ,
  
  {
    accessorKey:"Name",
    header:(row)=>{
      return (
        <div className="flex  text-customLight flex-row gap-x-2 items-center">
        Name
         
        </div>
      )
    }
    ,cell:({row})=>{
      return <div
      className="
      text-customLight">{row.getValue("Name")}</div>
    }

   },

   { accessorKey:'id',
    header:(row)=>{
      return (
        <div className="flex  text-customLight flex-row gap-x-2 items-center">
        Status

        </div>
      )
    }
    ,cell:({row})=>{
      const {Topic,classId,date,reasonId}=useAttendanceData();
     const [isAbsent,setIsAbsent]=useState(false);
     const [isPresent,setIsPresent]=useState(false);
     const [isLeave,setIsLeave]=useState(false);
     const [loading,setLoading]=useState(false);
    const [reason,setReason]=useState<string|null>(null);
      const getcurrent=()=>{
        setLoading(true);
        axios.post("/api/attendance/getCurrent",{
          classId,
        date,
        id:row.original.id,
        }).then((res)=>{
          setIsAbsent(res.data.absent||false)
          setIsPresent(res.data.present||false)
          setIsLeave(res.data.leave||false)
          setReason(res.data.reason||false)
        }
        ).catch((err)=>{
          console.log("attendance/NewAttendancecolumn", err)
        }
        ).finally(()=>{
          setLoading(false);

        }
        )
      }
    useEffect(()=>{
      setIsAbsent(false)
      setIsLeave(false)
      setIsPresent(false)
      setReason(null)
      getcurrent();
    },[date])
    
    
     const fetchData=(a:boolean,p:boolean,l:boolean)=>{
     if(!Topic||!classId||!date){
toast.error("Topic Description can not be blank!")
      return ;
     }
    if(l&&(reasonId!=row.original.id)){
      toast.error("Please mention leave reason!")
      return ;
    }
      setLoading(true);
      axios.post("/api/attendance",{
        topic:Topic,
        isAbsent:a,
        fine:a?25:undefined,
        isOnLeave:l,
        isPresent:p,
        due:a?true:undefined,
        classId:classId,
        id:row.original.id,
        date:date,
      }).then((res)=>{
        setIsAbsent(res.data.absent)
        setIsPresent(res.data.present)
        setIsLeave(res.data.leave)
        setReason(res.data.reason)
      }).catch((err)=>{
        console.log("attendance/NewAttendancecolumn",err)
      }).finally(()=>{
setLoading(false);

      })
     } 
      return <div
      className="
      text-customLight"> 
      <DropdownMenu
      >
<DropdownMenuTrigger
 
  className={
    cn(` flex
    focus-visible:ring-0
    flex-row gap-x-1
    items-center
    justify-center`,
    isAbsent?"text-red-600":isLeave?"text-sky-600":isPresent?"text-green-600":"")
 
  }
 
>

<div
className="
flex
focus:ring-0
focus-within:ring-0
focus-visible:ring-offset-0
    focus-visible:ring-0
    flex-row gap-x-1
    items-center
    justify-center">  
{loading&&<Loader2
 className="text-customTeal
 animate-spin
 w-4 h-4 
 "/>}
    {isAbsent ? "Absent" : isPresent ? "Present" : isLeave ? "Leave" : "undefined"} 
    </div>
  </DropdownMenuTrigger>
<DropdownMenuContent

>
 <DropdownMenuItem
 onClick={()=>{
  
 
fetchData(false,true,false)
 
  
 }}>Present  </DropdownMenuItem>
<DropdownMenuItem
className=" "
onClick={()=>{
 
  fetchData(true, false, false)
}}
>Absent</DropdownMenuItem>
<DropdownMenuItem
className=" "
onClick={()=>{
 
  
  fetchData(false, false, true) 
 
}}
>Leave</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
      
      </div>
    }
      

   },{
    accessorKey:"id",
    header:(row)=>{
      return (
        <div className="flex  text-customLight flex-row gap-x-2 items-center">
        Reason

        </div>
      )
    },
    cell:({row})=>{
const {date,classId,setReasonId}=useAttendanceData()
const [reason,setReason]=useState<string|null>("");
const [loading,setLoading]=useState(false);
      const getcurrent=()=>{
        setLoading(true);
        axios.post("/api/attendance/getCurrent",{
          classId,
        date,
        id:row.original.id,
        }).then((res)=>{
          
          setReason(res.data.reason)

        }
        ).catch((err)=>{
          console.log("attendance/NewAttendancecolumn", err)
        }
        ).finally(()=>{
          setLoading(false);

        }
        )
      }
    useEffect(()=>{
      setReason(null)
      getcurrent();
    },[date])
    

      const fetchData=(r:string)=>{
        setLoading(true)
        axios.post("/api/attendance",{
          reason:r,
          classId:classId,
          id:row.original.id,
          date:date,
        }).then((res)=>{
          setReason(res.data.reason)
          setReasonId(row.original.id);
        }).catch((err)=>{
          console.log("attendance/NewAttendancecolumn", err)
        }
        ).finally(()=>{
          setLoading(false);
        })
      }
      return <div
      className="
      text-customLight
      flex
      flex-row
      gap-x-1
      ">{loading&&<Loader2
      className="text-customTeal
      animate-spin
      w-4 h-4 
      "/>}<Input
      className="bg-customGray
      ring-0
      text-customLight
      focus-within:ring-0
      focus-visible:ring-0
      focus-visible:ring-offset-0
      "
      value={reason||""}
      onBlur={()=>{
fetchData(reason!)
      }}
      onChange={(e)=>setReason(e.target.value)}
      /></div>
    }
   }
   
]
