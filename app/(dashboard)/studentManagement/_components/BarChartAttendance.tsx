import React from 'react'
import { format, parse } from 'date-fns';
import {Tooltip, ResponsiveContainer,BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Cell, Label } from 'recharts';
import { Attendance, Class } from '@prisma/client';
import { scaleOrdinal } from 'd3-scale'; 
import { schemeCategory10 } from 'd3-scale-chromatic';  
import { AttendanceSummarization } from './AttendanceSummarization';
 
interface BarChartAttendanceprops{
    id:number;
    classes:(Class&{
        attendence:Attendance[]
    })[],
    year:number;
    month:number;
}
export const BarChartAttendance:React.FC<BarChartAttendanceprops> = ({
    classes,id,
    month,
    year
}) => {
    const colorScale = scaleOrdinal().range(schemeCategory10);

 
    const filtered:(Class&{
        attendence:Attendance[]
    })[]=classes?.map((cla)=>{
        const att=cla?.attendence?.filter((atte)=>{return atte?.studentId===id&&atte?.date?.endsWith(`.${month.toString().padStart(2, '0')}.${year}`)});
  return {
    ...cla,
    attendence:att,
   }
    })
    const filteredyear:(Class&{
      attendence:Attendance[]
  })[]=classes?.map((cla)=>{
      const att=cla?.attendence?.filter((atte)=>{return atte?.studentId===id});
return {
  ...cla,
  attendence:att,
 }
  })

 console.log(filtered[0])   
    let data: Record<string, any>[] = [{}];

filtered?.map((cla)=>{
//@ts-ignore
  if(data[0]?.name===cla?.attendence[cla?.attendence?.length-1]?.date){
    data.push({
      name:cla.attendence[cla.attendence.length-1]?.date,
      [cla.name+" "+cla.subject]:cla.attendence[cla.attendence.length-1]?.AttendancePercent
     })
      }else{
  data[0]={
   name:cla?.attendence[cla?.attendence?.length-1]?.date,
   [cla?.name+" "+cla?.subject]:cla?.attendence[cla?.attendence?.length-1]?.AttendancePercent
  }}
}) 
      console.log(data);
      
       let color:string[]=[];
return (<>

<div 
className='flex
p-0
flex-col
w-full
overflow-auto
m-0
right-0
left-0'
style={{ overflowX: 'auto', width: '100%', height: '300px' }}>
<ResponsiveContainer
className={""}
     width="100%" height="100%"> 
       <BarChart
       
        margin={{
          top: 5,
          right:0,
          left: 0,
          bottom: 5,
        }}
        className='p-0'
       dataKey={"name"} width={150} height={40} data={data}>
         
       <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
         
          
          <Tooltip    />
          <Legend />
            {filtered?.map((cla,index)=>{
color[index]=colorScale(cla?.name+" "+cla?.subject) as string
return <Bar 
key={index}
dataKey={cla?.name+" "+cla?.subject} fill={colorScale(cla?.name+" "+cla?.subject) as string} textAnchor='hi'>
 
            </Bar>
})}
            
          </BarChart>
       </ResponsiveContainer>

      </div>
      {filtered?.length>0?(<AttendanceSummarization 
      classesYear={filteredyear||[]}
      color={color}
      year={year}
      classes={filtered||[]}/>)
      :(<div
      className='flex
      flex-col
      w-full
      justify-center
      items-center
      text-customLight'>nothing to show</div>)}
            </>
  )
}

       
     
    

