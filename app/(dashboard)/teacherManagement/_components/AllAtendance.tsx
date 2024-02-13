import { Teacher, TeacherAttendance } from '@prisma/client'
import React, { useState } from 'react'
import { DataTable } from './All-Attendance-data-table'
import { columns } from './All-Attendance-columns'
import axios from 'axios'
import { useInView } from 'react-intersection-observer'
import { Loader2 } from 'lucide-react'

export const AllAtendance = () => {
  const [Attendance,setAttendance]=useState<(TeacherAttendance&{
    teacher:Teacher})[]>([])
  const [loading,setLoading]=useState(false);
  const fetchData=()=>{
    setLoading(true)
    axios.get("/api/teacherAttendance").then((res)=>{
      setAttendance(res.data);
    }).catch((err)=>{
      console.log("[err at allteendance teacherAttendance]",err)
    }).finally(()=>{
      setLoading(false);
    })
  }
  
const {ref}=useInView({
  threshold:0.1,
  triggerOnce:true,
  onChange:(inview)=>{
    if(inview){
      fetchData()
    }
  }
})

    return (
    <div
    ref={ref}
    
    className='relative'> 

    {loading&&<div
    className='absolute
    animate-spin
    items-center
    justify-center
    flex
    flex-col
    w-full
    top-10
     '>
      <Loader2
      className='text-customTeal'/>
      </div>}
     <div
     
     className='bg-customGray
     p-3
     w-full
     rounded-lg
     z-50
     '>

<DataTable
data={Attendance}
columns={columns}
key={"all-Attendance-table"}
/>
</div>


    </div>
  )
}
