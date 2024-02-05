import { Transition } from "@headlessui/react"
import { Attendance, Class, Student } from "@prisma/client"
import axios from "axios"
import { AlertTriangle, ChevronDown, ChevronUp, FileWarning, Loader2 } from "lucide-react"
import { Suspense, lazy, useState } from "react"
import { useInView } from "react-intersection-observer" 
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { FadeIn } from "./FadeIn"
const WarningLabel=lazy(()=>import("./WarningLabel").then((module)=>({default:module.WarningLabel})));

  

export const StudentsWarning = () => {
const [leaveProfiles,setLeaveProfiles]=useState<
(Student&{
  attendances:(Attendance&{
    class:Class
  })[]
})[]
>();
const [absentProfiles,setAbsentProfiles]=useState<
(Student&{
  attendances:(Attendance&{
    class:Class
  })[]
})[]
>();

const [total,setTotal]=useState(0);
const fetchData=()=>{
  setIsFetched(false);
  axios.get("/api/student/warning")
  .then((res)=>{

setLeaveProfiles(res.data.filterleaves);
setAbsentProfiles(res.data.filterAbsents);
setTotal(res.data.no);
setIsFetched(true);
  }).catch((err)=>{
    console.log("[ERROR at management_sync/app/(dashboard)/_components/StudentsWarning.tsx]",err)
  })
}

const [ref,inView]=useInView({
  threshold:0.1,
  triggerOnce:true,
  onChange:(inView)=>{
    if(inView){
    fetchData();}
  }
})
const [tap,setTap]=useState(false);
const [isfetched,setIsFetched]=useState(true);
  return (
    <div
    ref={ref}
    className='w-full
    relative'>
      {!isfetched&&<div
  
  className='
  absolute
rounded-lg
  w-full
  h-full
  bg-customLight/25
  justify-center
  items-center
  flex
  flex-col
  '>
<Loader2
className='
z-50
animate-spin
text-customTeal
w-8
h-8'/>
  </div>}
      <div
      className='
      bg-customGray
      rounded-lg
      p-6
      z-50
      flex
      flex-col
      '>
<div
className="flex
text-xl
text-customTeal
items-center
flex-row gap-x-2">
  Students On Attendance Warning <AlertTriangle
  className="w-6
  h-6 text-red-600
  "/>
</div>
<span
 className="text-customLight/80  ">Following are the students with more than 3 Un-Informed Absents or 4 Leaves!</span>
   <div
   className="
   flex
   items-center
   justify-center
   w-full 
   mt-2
   text-lg
   text-customTeal">Total {total } Students on Warning!</div>
   <div
   className="flex
   mt-2
   w-full
   items-center
   justify-center
   ">
    {tap?(<ChevronUp
    onClick={()=>setTap(false)}/>):(<ChevronDown onClick={()=>setTap(true)}/>)}
   </div>
   <div
   className="mt-4
   flex
   flex-col
   w-full
   space-y-2
   ">
    <Transition.Root
    show={tap}
    className="space-y-2
    w-full">
    {tap&&absentProfiles?.map((abse,i)=>(
      <FadeIn delay="delay-[500ms]">
      <Suspense
      fallback={

        <SkeletonTheme
        baseColor="#222831" highlightColor="#393E46">
<Skeleton
className='rounded-lg  w-full h-full'/>
        </SkeletonTheme>
      }>
      <WarningLabel
      fetchData={fetchData}
      key={i}
      profile={abse}/>
      </Suspense>
      </FadeIn>
    ))}
    {tap&&leaveProfiles?.map((abse,i)=>(
      <FadeIn delay="delay-[500ms]">
      <Suspense
      fallback={

        <SkeletonTheme
        baseColor="#222831" highlightColor="#393E46">
<Skeleton
className='rounded-lg  w-full h-full'/>
        </SkeletonTheme>
      }>
      <WarningLabel
      fetchData={fetchData}
      key={i}
      profile={abse}/>
      </Suspense>
      </FadeIn>
    ))}
    </Transition.Root>
    </div>   
      </div>
    </div>
  )
}
