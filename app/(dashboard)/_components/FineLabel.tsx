 
import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';
import React, { useState } from 'react'
import { FadeIn } from './FadeIn';
import { Check, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner'; 
import { useRouter } from 'next/router';
interface FineLabelprops{
    name:string;
  className:string;
  fine:number;
  roll:number
   fetchData:()=>void;
}
export const FineLabel:React.FC<FineLabelprops> = ({
    className,
   fetchData,
    fine,
    name,
    roll
}) => { 
const onClick=(due:boolean,payed:boolean)=>{
   
axios.patch("/api/student/fine/mark",{
due:due,payed:payed,
id:roll
}).then((res)=>{

  toast.success("done");
 
}).catch((err)=>{
  console.log("management_sync/app/(dashboard)/_components/FineLabel.tsx",err);
toast.error("something went wrong");
}).finally(()=>{ 
 
   fetchData()
  setIsLoadingp(false);
  setIsLoading(false);
  
})
}
  const [loading,setIsLoading]=useState(false);

  const [loadingp,setIsLoadingp]=useState(false);
  const [tap,setTap]=useState(false)

  return (
    <>
    <div
    onClick={()=>setTap(!tap)}
    className='w-full
    flex
    ring-1
    overflow-hidden
    ring-customTeal
    rounded-lg
    text-lg
    p-3
    gap-x-2
    flex-row
    '>  <div>{roll}</div>
        <div>{name}</div> 
        <div className='text-customTeal'>{fine}</div>
        <div>{className}</div>
         
    
    </div>
    <div
    className='flex
    mt-2
    w-full
    items-center
    justify-center
    flex-row
    gap-x-4
    '>
      <Transition.Root
    show={tap}
    as={'div'}
    className="gap-x-4">
        <FadeIn delay=''>
          <div
          className='flex
          
          flex-row
          w-full
          
          gap-x-4'>
    <Button
    type='button'
     onClick={()=>{
      setIsLoadingp(true);
      onClick(false,true)
     }}
    className='bg-customTeal/70
    mt-2'>{loadingp?(<Loader2
    className="animate-spin"/>):(<>Collect <Check/></>)}</Button>
  <Button
    type='button'
    onClick={()=>{
      setIsLoading(true);
      onClick(false,false)
 }}
    className=' 
    mt-2'>{loading?(<Loader2
    className="animate-spin"/>):(<>Forgive <Check/></>)}</Button>
  </div>
    </FadeIn>
    </Transition.Root>
    

    </div>
    </>
  )
}
