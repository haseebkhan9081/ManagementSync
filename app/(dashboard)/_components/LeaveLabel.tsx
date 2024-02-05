import { cn } from '@/lib/utils'
import { Attendance, Class, Student, TeacherAttendance } from '@prisma/client'
 
import React, { useState } from 'react'
 

interface LeaveLabelprops{
    p:TeacherAttendance ;
           
}

export const LeaveLabel:React.FC<LeaveLabelprops> = ({
   p,
   
}) => {
    
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
    justify-between
    items-center
    w-full
    ring-1
    ring-customTeal
       text-sm
    rounded-md
    '>
        <div
        className=''>{p?.date}  </div>
         
        <div
        className={cn(`mr-1 text-red-600` )}>{"Leave"}</div>
         
        
         </div>
                
        
        </>
          
  )
}
