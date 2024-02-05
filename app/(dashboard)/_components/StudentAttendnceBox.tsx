import { Badge } from '@/components/ui/badge'; 
import { Attendance, Class, Student } from '@prisma/client';
import { ChevronDown, ChevronUp, Loader2} from 'lucide-react';
import React, { Suspense, lazy, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
 const StudentLabel=lazy(()=>import("./StudentLabel")
 .then((module)=>({default:module.StudentLabel})));
import { Transition } from '@headlessui/react'
import { FadeIn } from './FadeIn';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import axios from 'axios';
import { format } from 'date-fns';
import { useInView } from 'react-intersection-observer';
interface StudentAttendnceBoxprops{
     whole?:boolean;
     myself?:boolean;
}
export const StudentAttendnceBox:React.FC<StudentAttendnceBoxprops> = ({
   
    myself
}) => {
    const [all,setAll]=useState<number>(0);
    const [allPresent,setAllPresent]=useState<number>(0);
    const [allAbsent,setAllAbsent]=useState<number>(0);
    const [allLeave,setAllLeave]=useState<number>(0); 
const [absentProfile,setBasentProfile]=useState<(
    Attendance&{
        student:Student,
        class:Class,
    }
    )[]>();
const [tap,setTap]=useState(false);

const today = new Date();
const dateToday=format(today ,'dd.MM.yyyy');
    
//for fetching data 
const fetchData=async()=>{
       setIsFetched(false);
    axios.post(`/api/student/${myself?'getCountOfAllmyself':'getCountOfAll'}`,{
        date:dateToday
    }).then((response)=>{
        console.log(response.data)
        setAll(response.data.total);
        setAllPresent(response.data.present);
        setAllAbsent(response.data.absent);
        setAllLeave(response.data.leave);
        setBasentProfile(response.data.profiles)
     setIsFetched(true);
    }).catch((err)=>{
        console.log("[app/(dashboard)/_components/HomePage.tsx]",err);
    })
    
    
    }
const [isfetched,setIsFetched]=useState(true);
 //when in view only then fetch data 
 const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.1, // Trigger the callback when 50% of the element is in the viewport
    onChange: (inView) => {
        if (inView) {
             fetchData();
            

        } 
}
}

);   
console.log("the percent value ",(allPresent/all)*100);
  return (
  <>
  
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
    flex
    flex-col
    z-50
     w-full
    justify-between
    p-6
    bg-customGray
    rounded-xl'>
    <div
    className='
    flex
    flex-row
     
     w-full
    justify-between

    bg-customGray
    rounded-xl'> 
    <div
    className='flex
    space-y-2
    flex-col'>
        <p
        className='text-customTeal
        text-xl'>{myself?"From your Classes":"From whole Library"}</p>
<p
className='text-lg'>
Present Today 
</p>
<p
className='text-center
flex-row
flex
items-center
justify-center
gap-x-1'>
 <p
 className='text-customTeal text-2xl'>{allPresent  }</p> Students of <p className='text-2xl'>{all}</p>   
</p>
  <p></p>  
  <div>
   <Badge
   
  
   variant={'destructive'}><p className='text-lg'>{ allAbsent} absents</p></Badge>
   </div>
   <div>
   <Badge
   
  
   variant={'secondary'}><p
   className='text-lg'>{ allLeave} on leave</p></Badge>
   </div>
    </div>
    <div
    className='w-[100px]'> 
        <CircularProgressbar
        styles={buildStyles({
            pathColor:'#00ADB5',
            textColor:'#00ADB5',
            trailColor:'#222831'
        })}
        value={(allPresent/all)*100}
        text={`${((allPresent/all)*100).toFixed(2)}%`}
        className='text-customTeal'
        />
    </div>
    </div>
    <div
    className='justify-center
    flex-col
    items-center
    w-full
    flex
    '>
        {tap?(
            <ChevronUp
            onClick={()=>setTap(false)}/>
        ):(
            <ChevronDown
            onClick={()=>setTap(true)}/>
        )}
    
{/* from here we will show the hidden info */}
{(
<div

className='w-full
space-y-2'>
    <Transition.Root
    as='div'
    className='w-full
    space-y-2'
    show={tap}>

    {absentProfile?.map((profile,i)=>(
         <FadeIn delay='delay-[500ms]'>
        <Suspense
        fallback={
            <SkeletonTheme
            baseColor="#222831" highlightColor="#393E46">
<Skeleton
className='rounded-lg  w-full h-full'/>
            </SkeletonTheme>
        }>
        <StudentLabel
        show={tap}
        key={i}
        p={profile}/>
        </Suspense>
        </FadeIn>
    ))}
 </Transition.Root>
</div>
      
)}

    </div>
    </div>
            </div>
            </>
  )
}
function wait(time:number){
    return new Promise(resolve=>setTimeout(resolve,time))
  }