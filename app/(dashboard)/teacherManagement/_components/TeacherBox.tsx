import { Class, Teacher, TeacherAttendance } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import TeacherAttendnceBox from './TeacherAttendance'
interface TeacherBoxprops{
    profile:(Teacher&{
        classes:Class[],
        teacherAttendances:TeacherAttendance[]
    })
}
export const TeacherBox:React.FC<TeacherBoxprops> = ({
    profile
}) => {
  return (
    <div
    className='w-full p-6'>
<div
className='flex
flex-col
w-full
z-50
bg-customGray
rounded-lg'>
<div
className='flex
 
rounded-lg
gap-x-2
p-4
text-customLight
flex-row
w-full'>
    <div
    className=' 
    aspect-square

    relative
    w-[100px]
     '>
        <Image
        className=' 
        rounded-full
        object-cover'
        src={profile?.imageUrl||"/images/placeholder.jpg"}
        alt={profile?.email||""}
        fill />
    </div>
   <div
   className='flex
   flex-col
   text-lg'> 
  <div>{profile?.firstName+" "+profile?.lastName}</div> 
  <div>{profile?.email}</div></div>

</div>

<div>

</div>
<TeacherAttendnceBox
id={profile?.clerkId}/>
</div>

    </div>
  )
}
