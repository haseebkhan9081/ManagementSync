import { Transition } from '@headlessui/react';
import { AlertTriangle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import React, { Suspense, lazy, useState } from 'react'
import { FadeIn } from './FadeIn';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useInView } from 'react-intersection-observer';
import { Average, Class, Student } from '@prisma/client';
import axios from 'axios'; 
const AcademicWarningLabel=lazy(()=>import("./AcademicWarningLabel").then((module)=>({default:module.AcademicWarningLabel})));
export const AcademicWarnings = () => {
    const [profiles,setProfiles]=useState<(Average&{
        class:Class,
        student:Student
    })[]>([]);
const fetchData=()=>{
    setIsloading(true)
axios.get("/api/student/warning/academic").then((res)=>{
    setProfiles(res.data);
}).catch((err)=>{
    console.log("[Err at AcademicWarnings]",err);

}).finally(()=>{
    setIsloading(false);
})
}
    const {inView,ref}=useInView({
        threshold:0.1,
        triggerOnce:true,
        onChange:(inView)=>{
if(inView){
fetchData();
}
        }
    })
    const [tap,setTap]=useState(false);
    const [loading,setIsloading]=useState(false);
  return (
    <div
    ref={ref}
    className='w-full
    relative'>
{loading&&<div
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
  </div>

}
        <div
        className='
        flex
    flex-col
    z-50
     w-full
    justify-between
    p-6
    bg-customGray
    rounded-xl
        
        '>
           <div
           className='text-xl
           text-customTeal'>Students on Academic Warning
           <AlertTriangle
  className="w-6
  h-6 text-red-600
  "/></div>
<span
 className="text-customLight/80  ">Following are the students with over All Average less than 50%!</span>
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
    {tap&& profiles?.map((p,i)=>(
      <FadeIn delay="delay-[500ms]"
      
      key={i}>
      <Suspense
      fallback={

        <SkeletonTheme
        baseColor="#222831" highlightColor="#393E46">
<Skeleton
className='rounded-lg  w-full h-full'/>
        </SkeletonTheme>
      }>
       <AcademicWarningLabel
       key={i}
       Cname={p?.class?.name+" "+p?.class?.subject}
       Sname={p?.student?.Name}
       averge={p?.Average}
       />
      </Suspense>
      </FadeIn>
    ))}
     
    </Transition.Root>
    </div> 
        </div>

    </div>
  )
}
