import React, { Suspense, lazy, useState } from 'react' 
import { Student } from './columns';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';  
const LineChartGrades=lazy(()=>import("./LineChartGrades").then((module)=>({default:module.LineChartGrades})));
 
interface GradesTabProps{
    profile:Student|null
}
export const GradesTab:React.FC<GradesTabProps> = ({
    profile
}

) => {
    const today=new Date();
    const currentYear=today.getFullYear();
    const [gSection,setGSection]=useState(0);
    const currentMonth=today.getMonth()+1;
    const filterBtItems:{value:number,label:string}[] = [];
      profile?.classes.map((cla,index:number)=>(
        filterBtItems.push({
            value:index,
            label:cla?.name+" "+cla?.subject
        })
      ))
    const thisMonthGrades=profile?.classes[gSection]?.Grade?.filter((g)=>(g.Date.endsWith(`.${currentMonth.toString().padStart(2, '0')}.${currentYear}`)))     
  console.log(thisMonthGrades);
    return (
    <div
    className='
    w-full
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
       Performance throughout the year {currentYear}
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
           <DropdownMenuCheckboxItem>Select a Section</DropdownMenuCheckboxItem>
            {
              filterBtItems.map((section) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={section.value}
                    className="capitalize"
onClick={()=>{setGSection(section.value)}}
checked={section.value===gSection}
                  >
                    {section.label}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
          
        </DropdownMenu>
    </div>
    <div
    className='flex
    flex-col
    w-full
    space-y-6
    mt-6
    '>
    <Suspense
    fallback={
      <div>loading...</div>
    }>
      <LineChartGrades
      Grade={profile?.classes[gSection]?.Grade}
      id={profile?.id}
      /> 
    </Suspense>

     
    </div>
    </div>
  )
}
