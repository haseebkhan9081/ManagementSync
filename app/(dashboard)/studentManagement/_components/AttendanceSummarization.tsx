import { Attendance, Class } from '@prisma/client'
import React, { useState } from 'react'
import { BarChartAttendance } from './BarChartAttendance';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Transition } from '@headlessui/react';
import { FadeIn } from '../../_components/FadeIn';
import { cn } from '@/lib/utils';
import { Fade } from '@mui/material';
interface AttendanceSummarizationprops{
    classes:(Class&{
        attendence:Attendance[]
    })[],
    color:string[];
    year:number;
    classesYear:(Class&{
        attendence:Attendance[]
    })[];
}
export const AttendanceSummarization:React.FC<AttendanceSummarizationprops> = ({
    classes,
    classesYear,
    color,
    year
}) => {
const [tap,setTap]=useState(false);
const [showLeaves,setShowLeaves]=useState(false);
  return (
    <div
    className='flex
    flex-col
    space-y-4
    w-full
    justify-center
    items-center'>

         <div
         className='text-customTeal
         flex
         text-lg
         flex-row gap-x-6'>Total Leaves: {
            classes.map((cla,index)=>(
                <div
                key={index}
                style={{
                    color:color[index]
                }}>{cla.attendence[cla.attendence.length-1]?.countofLeaves}</div>
            ))
         }</div>
         <div
         className='text-customTeal
         flex
         text-lg
         flex-row gap-x-6'>Total Absents:{
            classes.map((cla,index)=>(
                <div
                key={index}
                style={{
                    color:color[index]
                }}>{cla.attendence[cla.attendence.length-1]?.countOfAbsents}</div>
            ))
         }</div>
         <div
         className='text-customTeal
         flex
         text-lg
         flex-row gap-x-6'>Total Presents:{
            classes.map((cla,index)=>(
                <div
                key={index}
                style={{
                    color:color[index]
                }}>{cla.attendence[cla.attendence.length-1]?.countofPresent}</div>
            ))
         }</div>
         <div
         className='text-customTeal
         flex
         text-lg
         flex-row gap-x-6'>Total Attendance:{
            classes.map((cla,index)=>(
                <div
                key={index}
                style={{
                    color:color[index]
                }}>{cla.attendence?.length}</div>
            ))
         }</div>
<div
className='flex
flex-col
items-center
justify-center
w-full
space-y-4'>
<div
className='flex
flex-row
items-center
justify-between'>
    {tap?(<ChevronDown
    onClick={()=>setTap(false)}
    className='text-customTeal
    cursor-pointer
    w-8 h-8'
    />):(<ChevronRight
    onClick={()=>setTap(true)}
    className='text-customTeal
    cursor-pointer
    w-8 h-8'/>)}   
 
<h1
className='text-xl font-semibold text-customTeal
'>Summary for Year {year} </h1>
</div>
<Transition.Root
show={tap}>
  <FadeIn delay='delay-[500ms]'>  
 <div
 className='flex
 flex-col
 w-full
 items-center
 justify-center'>
 <div
         className='text-customTeal
         flex
         text-lg
         flex-row gap-x-6'>Total Leaves:{
            classesYear.map((cla,index)=>(
                <div
                key={index}
                style={{
                    color:color[index]
                }}>{cla?.attendence[cla?.attendence?.length-1]?.countofLeavesYear||0}</div>
            ))
         }</div>
  <div
         className='text-customTeal
         flex
         text-lg
         flex-row gap-x-6'>Total Absents:{
            classesYear?.map((cla,index)=>(
                <div
                key={index}
                style={{
                    color:color[index]
                }}>{cla.attendence[cla.attendence.length-1]?.countOfAbsentsYear||0}</div>
            ))
         }</div>
 <div
         className='text-customTeal
         flex
         text-lg
         flex-row gap-x-6'>Total Presents:{
            classesYear.map((cla,index)=>(
                <div
                key={index}
                style={{
                    color:color[index]
                }}>{cla.attendence[cla.attendence.length-1]?.countofPresentYear}</div>
            ))
         }</div>
 <div
         className='text-customTeal
         flex
         text-lg
         flex-row gap-x-6'>Total Attendance:{
            classesYear.map((cla,index)=>(
                <div
                key={index}
                style={{
                    color:color[index]
                }}>{cla.attendence?.length}</div>
            ))
         }</div>
</div>
</FadeIn>
</Transition.Root>
</div>

<div
className='flex
flex-col
items-center
justify-center
w-full
space-y-4
'>

<div
className='
flex
w-full
flex-row
items-center
space-x-2
justify-center'>
    {showLeaves?(<ChevronDown
    onClick={()=>setShowLeaves(false)}
    className='text-customTeal
    cursor-pointer
    w-8 h-8'
    />):(<ChevronRight
    onClick={()=>setShowLeaves(true)}
    className='text-customTeal
    cursor-pointer
    w-8 h-8'/>)}   
 
<h1
className='text-xl font-semibold text-customTeal
'>Summary for Absents & Leaves This Month </h1>
</div>
<Transition.Root
show={showLeaves}
>
 <FadeIn
 delay='delay-[500ms]'
 >  
<div
className='flex
flex-col
w-full
space-y-4'>
{classes.map((cla,index)=>(
    cla.attendence.map((p,index)=>(
<div
 key={index}
    className='
    
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
        style={{
            color:color[index]
        }}
        >{cla.name}</div>
        <div
        className={cn(`mr-1`,
        p?.absent?"text-red-600":"text-green-600")}>{p?.absent?"Absent":"Leave"}</div>
         <div
        style={{
            color:color[index]
        }}
        >{p.date}</div>
        
         </div>  
    ))
      
))}
</div>
</FadeIn> 
</Transition.Root>
</div>

    </div>
  )
}
