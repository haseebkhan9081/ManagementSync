import { cn } from '@/lib/utils';
import { Attendance, Class, Grade } from '@prisma/client'
import { AlertTriangle, FileWarning } from 'lucide-react';
import React, { useEffect } from 'react'
import { CartesianGrid,Tooltip, Legend, LineChart, ResponsiveContainer, XAxis, YAxis, Line, TooltipProps } from 'recharts';


interface LineChartGradesProps{
     id:number|undefined;
        Grade:(Grade&{
          class:Class})[]|undefined
      
}
export const LineChartGrades:React.FC<LineChartGradesProps> = ({
    Grade
    ,id
}) => {
const FilteredGrades:(Grade&{
  class:Class})[]|undefined=Grade?.filter((gr)=>gr.studentId===id);
const data:{name:string,percent:string}[]=[]; 
console.log("filetered",FilteredGrades);
FilteredGrades?.map((g)=>(
    data.push({
        name:g.Date,
        percent:((g.percent)*100).toFixed(2)
    })
))
let sum=0;
data.map((ob)=>(
sum+=Number(ob.percent)
))
const Average=(sum/data.length).toFixed(2);
console.log(data);



 
const CustomTooltip:React.FC<TooltipProps<string,string>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip 
        flex
        p-3
        flex-col
        w-full
        text-customLight
        rounded-lg
        bg-customGray
        ">
            <p>Test Name: {FilteredGrades?.find((d)=>(d.Date===label))?.Topic}</p>
           <p>Date: {label}</p>
           <p>Total Marks: {FilteredGrades?.find((d)=>(d.Date===label))?.Total}</p>
           <p>O.Marks: {FilteredGrades?.find((d)=>(d.Date===label))?.value}</p>
           <p> Percentage: {payload[0].value}%</p>
           
                </div>
      );
    }
  
    return null;
  };


  return (<>
    <div
    className='w-full
    flex
    flex-col

    '
    style={{ overflowX: 'auto', width: '100%', height: '300px' }}>

        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
             
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
         
          
          <Tooltip content={<CustomTooltip/>} />
          <Legend />
          <Line type="monotone" dataKey="percent" stroke="#00ADB5" activeDot={{ r: 8 }} />
               </LineChart>
      </ResponsiveContainer>
    </div>
    <div
    className={cn(`flex
    flex-row
    text-xl
    items-center
    gap-x-4
    justify-center
    text-customTeal
    `,
    Number(Average)<50&&'text-red-600')}>
      <p>  Average: {Average}%</p>
      {Number(Average)<50&&<AlertTriangle/>}
    </div>
     
    </>
  )
}
