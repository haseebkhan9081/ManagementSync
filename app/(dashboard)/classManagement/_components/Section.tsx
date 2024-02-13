import { ChevronDown, ChevronUp, DotSquareIcon, MoreHorizontal } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Class, Student, Teacher } from '@prisma/client';
import { Transition } from '@headlessui/react';
import { FadeIn } from '../../_components/FadeIn';
import { useEditSectionState } from '@/app/hooks/useSectionEditState';
import { Toggle } from '@/components/ui/toggle';
import { Switch } from '@/components/ui/switch';
import axios from 'axios';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useAllsectionsState } from '@/app/hooks/useAllSectionsState';
  
interface SectionProps{
    section:Class&{
        students:Student[],
        teachers:Teacher
      },
    name:string,
    Students:Student[],
    numberOfStudents:number,
    teacherName:string,
    subject:string,
    randomNumber:number 

}

const images= [
"/images/Classroom-cuate.svg",
"/images/English teacher-rafiki.svg",
"/images/Learning-amico.svg",
"/images/Mathematics-rafiki.svg",
"/images/Online learning-amico.svg",
"/images/Reading book-pana.svg",
"/images/Reading glasses-cuate.svg"
,"/images/Teaching-amico.svg",
"/images/Writing room-amico.svg",
"/images/Writing room-cuate.svg"
]

export const Section:React.FC<SectionProps> = ({
    name,
    numberOfStudents,
    subject,
    teacherName,
    Students,
    section,
    randomNumber
    
}) => {
     const {setEditSection,setEditTap}=useEditSectionState();
const [tap,setTap]=useState(false);
const {fetchSections}=useAllsectionsState();
const [pass,setpass]=useState(section?.passedOut)  
return (
    <div
    className='
    relative
    w-full'>
        {
            
pass&&<div
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
p-3

'>
    <div
    className='absolute  left-3 top-3 '>
  <DropdownMenu>
  <DropdownMenuTrigger><MoreHorizontal className='text-customLight'/>  
         </DropdownMenuTrigger>
  <DropdownMenuContent side='left'>
    
    <DropdownMenuItem
    onClick={()=>{setEditSection(section)
    setEditTap(true)
    }}>Edit</DropdownMenuItem>
    <DropdownMenuItem
    className='flex-row gap-x-2'>
        
      Pass Out <Switch 
      checked={pass}
      onCheckedChange={(v)=>{setpass(v)
    axios.post("/api/class",{
        passedOut:v,
        id:section?.id
    }).then(()=>{
        toast.success("Updated")
    }).catch((err)=>{
        console.log("err",err)
        toast.error("something went wrong");
    }).finally(()=>{
        fetchSections(); 
    })
   
}

 

}
    />
    </DropdownMenuItem>
       </DropdownMenuContent>
</DropdownMenu>
</div> 

<div
    className='flex
    w-full
    absolute
    bottom-3
    text-customTeal
    items-center
    justify-center'
    onClick={()=>setTap(!tap)}>
    {tap?<ChevronUp
    className='animate-bounce '/>:<ChevronDown/>}</div>

 <p
    className='
    text-5xl
    text-red-600/25
    transform -rotate-12'>
    Passed Out

    </p>
    <p
    className='
    text-xl
    text-red-600/25
    transform -rotate-12'>
    {section?.passedOutDate}

    </p>

</div>
        }

        <div
        
        className='flex
        bg-customGray
        p-3
        z-50
        rounded-lg
        flex-col
        w-full'>
            <div
            className='w-full'>
            <DropdownMenu>
  <DropdownMenuTrigger><MoreHorizontal className='text-customLight'/>  
         </DropdownMenuTrigger>
  <DropdownMenuContent side='left'>
    
    <DropdownMenuItem
    onClick={()=>{setEditSection(section)
    setEditTap(true)
    }}>Edit</DropdownMenuItem>
    <DropdownMenuItem
    className='flex-row gap-x-2'>
        
      Pass Out <Switch 
      checked={pass!}
      onCheckedChange={(v)=>{setpass(v)
    axios.post("/api/class",{
        passedOut:v,
        id:section?.id
    }).then(()=>{
        toast.success("Updated")
    }).catch((err)=>{
        console.log("err",err)
        toast.error("something went wrong");
    }).finally(()=>{
        fetchSections();
    })

}
}
    />
    </DropdownMenuItem>
       </DropdownMenuContent>
</DropdownMenu>
</div>
             <div
            className='flex
            justify-between
            items-center
            flex-row
            w-full
            '>
<div
className='flex
text-customLight
flex-col
space-y-4'>
    <p
    className='text-lg font-bold'>{name +" "+subject}</p>
    <p>{numberOfStudents} Students</p>
    <p
    className='font-bold'>Taught by {teacherName}</p>
</div>
 <div
 className='w-[140px]
 aspect-square
 relative'>
<Image
src={images[randomNumber]}
fill
className='rounded-lg  object-cover'
alt=''
/>
 </div>
 </div>
 <DropdownMenuSeparator className='bg-customTeal '/>
 <div
 className='flex
 flex-row
 w-full
 items-center
 justify-center
 text-customTeal'>
    <div
    className='flex
    w-full
    items-center
    justify-center'
    onClick={()=>setTap(!tap)}>
    {tap?<ChevronUp/>:<ChevronDown/>}</div>
</div>
<div>
    <Transition.Root
    as='div'
    className={"flex mt-4 flex-col space-y-2"}
    show={tap}>
{Students?.map((st)=>(
<FadeIn delay=''>
    <div
    className='p-3
    ring-1
    rounded-lg
    ring-customTeal
    flex
    flex-row
    items-center
    justify-between
    gap-x-2
    text-customLight
    '>
<div
className=' w-[50px]
aspect-square
 
relative'>
    <Image
    alt={st?.Name}
    fill
    className='object-cover rounded-full'
    src={st?.imageUrl||"/images/placeholder.jpg"}
    />
    </div>        
<div>{st?.id}</div>
<div>{st?.Name}</div>
<div>{st?.fatherName}</div>
 
    </div>
    </FadeIn>
))}

    </Transition.Root>
    </div>   </div>
    </div>
  )
}
