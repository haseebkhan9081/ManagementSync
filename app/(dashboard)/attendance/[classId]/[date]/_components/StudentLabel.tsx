"use client";
import { Textarea } from "@/components/ui/textarea"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Attendance, Student } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
  

interface StudentLabelprops{
    student:Student,
    topic:string,
    classId:number,
    date:Date,
    absent:boolean|undefined,
    present:boolean|undefined,
    Reason:string,
    leave:boolean|undefined,
    result:Attendance[]

}
const StudentLabel:React.FC<StudentLabelprops>=({
    student,
    topic,
    classId,
    date,
    Reason,
    leave,
    present,
    absent,
    result
})=>{
console.log("the values in Studnet Label",leave,absent,topic,present,student?.id);
  let fine=0;
   const [reason,setReason]=useState<string>(Reason);
    const [isOnLeave,setIsOnLeave]=useState(leave);
    const [isAbsent,setIsAbsent]=useState(absent);
    const [isPresent,setIsPresent]=useState(present);
    const [isEditing,setIsEditing]=useState(false);
    const [isSubmitting,setIsSubmitting]=useState(false);
    useEffect(()=>{
        setReason(Reason);
        setIsOnLeave(leave);
        setIsAbsent(absent);
        setIsPresent(present)

    },[result])
    const onClick=(p:boolean,a:boolean,l:boolean)=>{
        if(topic){
            if(a){
                fine=50;
            }

            if(l&&reason.length<1){
                toast.error("Can't mark Attendance without the Reason for Leave!")
    return;
            }

         setIsSubmitting(true);
        axios.post("/api/attendance",{
            topic,
            fine,
            due:true,
            isAbsent:a,
            isOnLeave:l,
            isPresent:p,
            classId,
            id:student?.id,
            date:format(date ,'dd.MM.yyyy'),
            reason
        }).then((response)=>{
            toast.success("marked")
            setReason("");
            
        }).catch((err)=>{
            console.log("[ERROR attendence/newattendance/StudentLabel]",err);
            toast.error("failed to mark")
        }).finally(()=>{
            setIsEditing(false);
            setIsSubmitting(false);
        })}else{
            setReason("");
            toast.error("Can't mark Attendance without the Topic Description!")
        }
            
    }
    return <div className="
    "
    >
       {isEditing?(

        <div
        className={cn(`
        flex 
flex-row justify-between 
gap-x-1
ring-2 rounded-md

hover:ring-sky-700
hover:ring-2
ring-slate-900
shadow-lg
p-3
items-center`,
isPresent && 'transition  duration-500 bg-green-400 text-white  ring-green-700',
isAbsent && 'transition  duration-500 bg-red-400 text-white  ring-red-700',
isOnLeave && 'transition duration-500  bg-gray-400 text-white '

        )}>
<Button
type="button"
onClick={()=>{
    setIsPresent(false)
    setIsOnLeave(false)
    setIsAbsent(true)
    onClick(false,true,false);
}}
variant={"destructive"}>
    {isSubmitting&&isAbsent?(
        <div>
<Loader2
className="h-6 w-6 animate-spin"/>
        </div>
    ):(
<div>
Absent
</div>
    )}
</Button>

<Popover>
  <PopoverTrigger><Button
type="button"
onClick={()=>{
     
}}>{isSubmitting&&isOnLeave?(
    <div>
<Loader2
className="h-6 w-6 animate-spin"/>
    </div>
):(
<div>
Leave
</div>
)}</Button>
</PopoverTrigger>
  <PopoverContent>Please provide the Reason for Leave.
    <div
    className="flex
    flex-col
    w-full
    space-y-2">
    <Textarea
    
     
    className="
    text-slate-800
    text-xl
    mt-1
    focus-visible:outline-none
    focus-visible:border-none
     focus-visible:ring-sky-700
    focus-visible:ring-1"
    onChange={(v)=>{
        console.log(v.target.value);
        setReason(v.target.value)
    }}

    />
<Button
type="button"
onClick={()=>{
    setIsPresent(false)
    setIsAbsent(false)
    setIsOnLeave(true)
    onClick(false,false,true)
}}>{isSubmitting&&isOnLeave?(
    <div>
<Loader2
className="h-6 w-6 animate-spin"/>
    </div>
):(
<div>
Submit
</div>
)}</Button>
</div>
  </PopoverContent>
</Popover>


<Button
className="bg-green-800"
onClick={()=>{
    setIsAbsent(false)
    setIsOnLeave(false)
    setIsPresent(true)
    onClick(true,false,false)
}}>
    {isSubmitting&&isPresent?(
        <div>
<Loader2
className="h-6 w-6 animate-spin"/>
        </div>
    ):(
<div>
Present
</div>
    )}
    </Button>
        </div>
       ):(
<div
onClick={()=>setIsEditing(true)}
className={cn(`
flex 
flex-row justify-between 
gap-x-1
ring-2 rounded-md

hover:ring-sky-700
hover:ring-2
ring-slate-900
shadow-lg
p-3
items-center`,
isPresent&&'bg-green-400 text-white',
isAbsent&&'bg-red-400 text-white',
isOnLeave&&'bg-gray-400 text-white'
)}>
<Avatar>
    <AvatarImage src={student?.imageUrl||"/images/placeholder.jpg"}/>
</Avatar>
<p>
    { student?.Name}</p><p> 
    {student?.id}</p></div>
       )}  
            </div>
}

export default StudentLabel;