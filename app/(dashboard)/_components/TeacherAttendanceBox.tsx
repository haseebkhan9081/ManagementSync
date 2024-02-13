import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CircularProgress } from '@mui/material';
import { Attendance, Class, Student, TeacherAttendance } from '@prisma/client';
import { ChevronDown, ChevronUp, Copy, Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { StudentLabel } from './StudentLabel';
import { Transition } from '@headlessui/react'
import { FadeIn } from './FadeIn';
import axios from 'axios';
import { useInView } from 'react-intersection-observer'; 
import { LeaveLabel } from './LeaveLabel';

 const TeacherAttendnceBox= ({
    
}) => {
    const [total,setTotal]=useState<number>(0);

    const [present,setPresent]=useState<number>(0);

    const [leave,setLeave]=useState<number>(0);
    const [leaveProfile,setleaveProfile]=useState<TeacherAttendance[]>([]);
    const fetchData=()=>{
        axios.get("/api/selfAttendance")
        .then((response)=>{
            console.log(response.data)
          setTotal(response.data.total);
          setPresent(response.data.present)
          setLeave(response.data.leave);
          setleaveProfile(response.data.leaveProfile)
        setIsFetched(true);
        }).catch((err)=>{
            console.log("[err management_sync/app/(dashboard)/_components/TeacherAttendanceBox.tsx ]",err);
        }).finally(()=>{
          setIsFetched(true);
        })
    }
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
const [tap,setTap]=useState(false);


const [isfetched,setIsFetched]=useState(false);

  return (<div
  ref={ref}
  
  className='w-full
  
  relative
  '>
    {!isfetched&&<div
  
  className='
  absolute
rounded-lg
bg-customLight/25
  w-full
  h-full
  
  justify-center
  items-center
  flex
  flex-col
  '>
    <div>
<Loader2
className='
z-50
animate-spin
text-customTeal
w-8
h-8'/>
</div>
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
        text-xl
        '>Your Attendance This Month</p>
<p className='text-lg text-customLight'>
You were present
</p>
<p
className='text-center
flex-row
flex
items-center
justify-center
gap-x-1'>
 <p
 className='text-customTeal text-2xl'>{present }</p>  of  <p
 className='text-2xl'>{ total}</p> Days 
</p>
  <p></p>  
  <div>
   <Badge
   
  
   variant={'destructive'}> <p 
   className='text-lg'>You had { leave} leaves</p> </Badge>
   </div>
   <div> 
   </div>
    </div>
    <div
    className='w-[150px]'> 
        <CircularProgressbar
        styles={buildStyles({
            pathColor:'#00ADB5',
            textColor:'#00ADB5',
            trailColor:'#222831'
        })}
        value={(present/total)*100}
       text={`${((present/total)*100).toFixed(2)}%`}
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

    {leaveProfile?.map((profile,i)=>(
         <FadeIn delay='delay-[500ms]' key={i}>
        <LeaveLabel
         
        key={i}
        p={profile!}/>
        </FadeIn>
    ))}
 </Transition.Root>
</div>
      
)}

    </div>
    </div>
            </div>
  )
}


export default TeacherAttendnceBox;