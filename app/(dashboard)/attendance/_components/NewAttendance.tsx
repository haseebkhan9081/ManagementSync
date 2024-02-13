import React, { lazy, useEffect, useState } from 'react' 
import { Editor } from '@/components/editor'
import { useAttendanceData } from '@/app/hooks/useAttendanceData'
import { format, parse, set } from 'date-fns'
import { Preview } from '@/components/preview'
import Select from '@/components/fancy-multi-select'
import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu'
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { Class, Student } from '@prisma/client'
import { columnsNewAttendance } from './NewAttendanceColumn'
import { useMyInfo } from '@/app/hooks/usemyInfo'
import DatePicker from '@/components/datePicker'
const DataTable=lazy(()=>import('./NewAttendanceTable').then((module)=>({default:module.DataTable})))
export const NewAttendance = () => {
const {setTopic,Topic,sections,date,setDate,setClassId}=useAttendanceData();
const [blur,setBlur]=useState(false);
const [classId,setClasId]=useState<Record<string,any>>({value:0,label:"please select a section to mark attendance"})
const [students,setStudents]=useState<Student[]>([]); 
const {teacherId}=useMyInfo();
const [filter,setFilter]=useState<Class[]>([]);
const [ldate,setlDate]=useState(new Date());
 
useEffect(
  ()=>{
const filter=sections?.filter((s)=>s.teacherid===teacherId)
setFilter(filter); 
const st=filter?.filter((section)=>section?.id===classId?.value)?.[0]?.students;
 setStudents(st);
 console.log(st);
},[classId,teacherId,sections]) 
  return (
    <div>
      <div
      className='p-3
     bg-customGray
      rounded-lg
      w-full
      h-full
      space-y-2
      flex
      flex-col
      mb-4
      z-50'>{sections.length===0&&<div>loading...</div>}
       <div>
        <Select
      value={classId}
      options={filter?.map((section)=>(
        {
          value:section?.id,
          label:section.name+' '+section?.subject
        }))}
         onChange={(v)=>{
          setClasId(v);
          setClassId(v.value)
      
         }}
         isSingle={true}
         label="Section"
       
      
      />
      </div>
        {blur?<Preview
        setBlur={setBlur}
        value={Topic}
        
        />:
        <Editor
        setBlur={setBlur}
        onChange={setTopic}
        value={Topic}
        />
        }
      <DatePicker
      date={ldate}
      onChange={(v)=>{
        setlDate(v)
        setDate(format(v,'dd.MM.yyyy'))
      }}
      />  
<DataTable
//@ts-ignore
 columns={columnsNewAttendance}
data={students||[]}
/>
      </div>
      <DropdownMenuSeparator/>
       </div>
  )
}
