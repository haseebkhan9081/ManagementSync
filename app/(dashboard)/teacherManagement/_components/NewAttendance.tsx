import DatePicker from '@/components/datePicker'
import React, { useEffect, useState } from 'react'
import { DataTable } from './New_Attendance_data-table';
import { Teacher, columns } from './NewAttendanceColumns';
import { useTeacherAttendanceDateState } from '@/app/hooks/useTeacherAttendanceDate';
import { format } from 'date-fns';
 


interface NewAttendanceprops{
  teachers:Teacher[]
}
export const NewAttendance:React.FC<NewAttendanceprops> = ({
  teachers
}) => {
  const {setAttendanceDate}=useTeacherAttendanceDateState(
  
  )
   
 
  const [date,setDate]=useState<Date>(new Date());
  return (
    <div
    className='
    bg-customGray
    rounded-lg'>
      <div
      className='flex
     
      p-3
    
      rounded-md
      flex-col
      w-full
      space-y-2
      z-50
      '>
      <DatePicker
      key={'date'}
      date={date}
      onChange={(v)=>{
setDate(v)
setAttendanceDate(format(v,'dd.MM.yyyy'))
      }}
      />
      <DataTable

      columns={columns}
      data={teachers}
      key={"data-table"}
      />
      </div>
      </div>
  )
}
