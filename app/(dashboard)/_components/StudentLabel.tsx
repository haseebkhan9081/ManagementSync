import { cn } from '@/lib/utils'
import { Attendance, Class, Student } from '@prisma/client'
import { Copy } from 'lucide-react'
import React, { useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import { FadeIn } from './FadeIn';
import { Transition } from '@headlessui/react';

interface StudentLabelprops{
    p:(Attendance&{
            student:Student,
                 class:Class,
        }
        
            ) ,
            show:boolean,
}

export const StudentLabel:React.FC<StudentLabelprops> = ({
   p,
   show
}) => {
    const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    toast.success("Copied!"); 
  };
  return  (
    <>
    
    
    <div
    className='
    transition
ease-in-out
duration-700
    p-3
    flex
    flex-row
     gap-x-2
     overflow-auto
    items-center
    w-full
    ring-1
    ring-customTeal
       text-lg
    rounded-md
    '>
        <div
        className=''>{p?.student?.Name}  </div>
        <div>{p?.class?.name}</div>
        <div
        className={cn(`mr-1`,
        p?.absent?"text-red-600":"text-sky-600")}>{p?.absent?"Absent":"Leave"}</div>
        <div
        className='flex
        flex-row
        '
        >{p?.student?.Contact}<CopyToClipboard text={p?.student?.Contact||""} onCopy={handleCopy}>
         
          <Copy
          className={cn(`w-6 h-6 cursor-pointer`,
          isCopied?"text-green-600":"text-customTeal")}/>
         
      </CopyToClipboard>
      
      </div>
        
         </div>
                
        
        </>
          
  )
}
