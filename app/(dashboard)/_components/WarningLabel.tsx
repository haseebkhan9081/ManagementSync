import { Button } from '@/components/ui/button'
import { Transition } from '@headlessui/react'
import { Attendance, Class, Student } from '@prisma/client'
import { Check, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { FadeIn } from './FadeIn'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useMyInfo } from '@/app/hooks/usemyInfo'
interface WarningLabelProps{
    profile:Student&{
        attendances:(Attendance&{
            class:Class
          })[]
      },
      fetchData:()=>void;
}
export const WarningLabel:React.FC<WarningLabelProps> = ({
    profile,
    fetchData
}) => { 

 const {admin}=useMyInfo()   
const onclick=()=>{
    setIsLoading(true);
    axios.patch("/api/student/warning/relive",{
     id:profile?.id
    }).then((res)=>{
        console.log(res.data)
        toast.success("done");
    }).catch((err)=>{
        toast.error("something went wrong!")
    }).finally(()=>{

        setIsLoading(false);
        fetchData();
         
    })
}
    const [loading,setIsLoading]=useState(false);
    const [tap,setTap]=useState(false)
  return (
   <> <div
   onClick={()=>setTap(!tap)}
    className='flex
    p-3
    ring-1
    ring-customTeal
    rounded-lg
    w-full
    flex-row
     justify-between'> 
    <div>{profile?.id+"  "+profile?.Name}</div>
    <div
    className='text-xl text-red-600'
    >{profile?.attendances.length}</div>
    <div>{profile?.attendances[0]?.leave?"Leaves":"Absents"}</div>
    <div>{profile?.attendances[0]?.class?.name}</div>
    </div>
   {<div
    className='w-full
    flex
    flex-row
   gap-x-2
    items-center
    justify-center'> 
    <Transition.Root
    show={tap}
    as={'div'}>
        <FadeIn delay=''>
    <Button
      disabled={!admin}
    type='button'
    onClick={onclick}
    className='bg-customTeal/70
    mt-2'>{loading?(<Loader2
    className="animate-spin"/>):(<>Relive <Check/></>)}</Button>
    </FadeIn>
    </Transition.Root>
    
    </div>}</>
  )
}
