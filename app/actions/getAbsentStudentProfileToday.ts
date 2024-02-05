import client from '@/lib/prismadb'
import React from 'react'

export const getAbsentStudentsProfileTodayByTeacherId = async(date:string,id:number) => {
   
  

 const presentToday=await client.attendance.findMany({
     where:{
         class:{
            teacherid:id
         },
         date:date,
         OR:[
            {absent:true},
            {leave:true}
         ]
     },
     include:{
         student:true,
         class:true,
     }

 })  
 return presentToday||[]; 
}
