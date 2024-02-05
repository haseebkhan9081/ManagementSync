import client from '@/lib/prismadb'
import React from 'react'

export const getAbsentStudentsTodayByTeacherId = async(date:string,id:number) => {
   
  

 const presentToday=await client.student.count({
    where:{
        classes:{
            some:{
                teacherid:id
            }
        },
        attendances:{
            some:{
                present:false,
                absent:true,
                date:date
            }
        }
    }
 })  
 return presentToday||0; 
}
