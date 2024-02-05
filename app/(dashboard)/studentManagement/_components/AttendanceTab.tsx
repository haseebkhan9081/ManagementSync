import React, { Suspense, lazy, useState } from 'react' 
import { Student } from './columns';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
const BarChartAttendance=lazy(()=>import("./BarChartAttendance").then((module)=>({default:module.BarChartAttendance})));
interface AttendanceTabProps{
    profile:Student|null
}
export const AttendanceTab:React.FC<AttendanceTabProps> = ({
    profile
}

) => {
    const today=new Date();
    const currentYear=today.getFullYear();
    const [gmonth,setMonth]=useState(today.getMonth()+1);
    const filterBtItems = [
        { value: 1, label: "January" },
        { value: 2, label: "February" },
        { value: 3, label: "March" },
        { value: 4, label: "April" },
        { value: 5, label: "May" },
        { value: 6, label: "June" },
        { value: 7, label: "July" },
        { value: 8, label: "August" },
        { value: 9, label: "September" },
        { value: 10, label: "October" },
        { value: 11, label: "November" },
        { value: 12, label: "December" },
      ];
      
         
  return (
    <div
    className='w-full
    p-0
    mt-6
    m-0
    flex
    flex-col
    items-center
    justify-center'>
        <div
        className='
        flex
        flex-row
        gap-x-2
    flex-1
        justify-between
        items-center'>
    <h1
    className='text-xl font-semibold text-customTeal'>
      Attendance accross {filterBtItems.find((item)=>item.value===gmonth)?.label} {currentYear}
    </h1>
    
    <DropdownMenu
   
    >
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="
              bg-customDark
              ring-1
              ring-customTeal
            ml-auto">
              <Filter
              className="
            
              text-customTeal
          
              w-6
              h-6"/>
            </Button>
          </DropdownMenuTrigger>
           
          <DropdownMenuContent side='right' align="end">
           <DropdownMenuCheckboxItem>Select a month</DropdownMenuCheckboxItem>
            {
              filterBtItems.map((month) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={month.value}
                    className="capitalize"
onClick={()=>{setMonth(month.value)}}
checked={month.value===gmonth}
                  >
                    {month.label}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
          
        </DropdownMenu>
    </div>
    <Suspense
    fallback={
      <div>loading...</div>
    }>
      <BarChartAttendance
      
      month={gmonth}
      year={currentYear}
      id={profile?.id!}
      classes={profile?.classes!}
      />
    </Suspense>
     
    </div>
  )
}
