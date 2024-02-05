import client from '@/lib/prismadb'
import React from 'react'

export const getOnLeaveStudentsTodayByTeacherId = async(date:string,id:number) => {
   
  

 const presentToday=await client.student.count({
    where:{
        classes:{
            some:{
                teacherid:id
            }
        },
        attendances:{
            some:{
                leave:true,
                date:date
            }
        }
    }
 })  
 return presentToday||0; 
}
