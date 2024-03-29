"use client";

import { Transition } from "@headlessui/react";
import { Class, Teacher, TeacherAttendance } from "@prisma/client";
import axios from "axios";
import { Loader2, PlusCircle, ScrollText } from "lucide-react";
import { Suspense, lazy, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer"; 
import { FadeIn } from "../_components/FadeIn";
import { Button } from "@/components/ui/button";
import { useTeacherAttendanceDateState } from "@/app/hooks/useTeacherAttendanceDate";
import { format } from "date-fns";
import { useMyInfo } from "@/app/hooks/usemyInfo";
const NewAttendance=lazy(()=>import("./_components/NewAttendance").then((module)=>({default:module?.NewAttendance})));
const TeacherBox= lazy(()=>import("./_components/TeacherBox").then((module)=>({default:module.TeacherBox})));
const AllAtendance=lazy(()=>import("./_components/AllAtendance").then((module)=>({default:module?.AllAtendance})))
const TeacherManagement=()=>{
const [teachers,setTeachers]=useState<(Teacher&{
    classes:Class[],
    teacherAttendances:TeacherAttendance[]
})[]>([]);
const [loading,setLoading]=useState(true);
const fetchData=()=>{
setLoading(true)
axios.get("/api/teacher/all").then((res)=>{
    setTeachers(res.data);

}).catch((err)=>{
    console.log("[Error at /home/haseeb/project/management_sync/app/(dashboard)/teacherManagement/page.tsx]")

}).finally(()=>{
    setLoading(false);
})

}
const {setAttendanceDate}=useTeacherAttendanceDateState(
  
    )
     
    useEffect(()=>{
  setAttendanceDate(format(new Date,'dd.MM.yyyy'))
    },[])
const {ref}=useInView({
    threshold:0.1,
    triggerOnce:true,
     onChange:(inview)=>{
        if(inview){
            fetchData();
        }
     }
})
const {fetchInfo}=useMyInfo();
   useEffect(()=>{
fetchInfo()
   },[])
const [newAttendance,setNewAttendance]=useState(false);
const [attendance,setAttendance]=useState(false);
const {admin}=useMyInfo()
 return <div
 ref={ref}
 className="bg-customDark
 w-full
 relative"
 >
  { loading&&<div
  className="flex
  flex-col
  items-center
  text-customTeal
  justify-center
  w-full">
    <Loader2
    
    className="text-customTeal;
    animate-spin
    w-8
    h-8"/>
    </div>}  <div
    className="flex
    flex-col
    w-full
    z-50
    ">
     <div
     className="mt-2
     flex-col
     flex
     w-full
     space-y-4
     p-3">
        <Button
          disabled={!admin}
        onClick={()=>{
            setAttendance(false)
            setNewAttendance(!newAttendance)}}
        className="gap-x-2
        bg-customTeal
        hover:bg-customGray
        ">
            {newAttendance?(<div>Cancel</div>):(<><PlusCircle/> New Attendance</>)}
           
        </Button>
        <Button
          
        onClick={()=>{

            setNewAttendance(false)
            setAttendance(!attendance)}}
        className="gap-x-2
        bg-customTeal
        hover:bg-customGray
        ">
             {attendance?(<div>Cancel</div>):(<>  <ScrollText/>  See All Attendance</>)}
        
          
        </Button>
         {newAttendance&&
         
         <Suspense>
            <NewAttendance
            //@ts-ignore
            teachers={teachers}
            />
         </Suspense>
         }
         {attendance&&
         
         <Suspense>
            <AllAtendance/>
         </Suspense>
         }
        </div>   
  <Transition.Root
  show={!loading}>      
 {teachers?.map((t,i)=>(
   <FadeIn delay=" " key={i}>
   <Suspense
   fallback={<div>loading...</div>}>
   <TeacherBox
   profile={t}/>
   </Suspense>
   </FadeIn>
 ))}
 </Transition.Root>

    </div>
     </div>
}

export default TeacherManagement;