import {create} from 'zustand';
import { Student } from '../(dashboard)/studentManagement/_components/columns';
import { Class, Teacher } from '@prisma/client';
import axios from 'axios';
import { format } from 'date-fns';

type AttendanceData = {
 Topic:string;
 loading:boolean,
 setLoading:(v:boolean)=>void;
 classId:number;
 setClassId:(v:number)=>void;
 date:string;
 setDate:(v:string)=>void;   
 sections:(Class&{
    students:Student[],
    
 })[],
  
setSections:(v:(Class&{
    students:Student[],
   
})[])=>void;
reasonId:number;
setReasonId:(v:number)=>void;
fetchSections:()=>void;
setTopic:(v:string)=>void;
};

export const useAttendanceData = create<AttendanceData>((set) => ({
 sections:[], 
 reasonId:0,
 loading:false,
 setLoading:(v)=>{set({loading:v})},
 setReasonId:(v)=>{set({reasonId:v})},
 classId:0,
 setClassId:(v)=>{set({classId:v})},
 date:format(new Date(), 'dd.MM.yyyy'),
 setDate:(v)=>{set({date:v})},
 Topic:"",
 setTopic:(v)=>{set({Topic:v})},
 fetchSections:()=>{
    set({loading:true})
    axios.get("/api/class/getCurrent").then((res)=>{
set({sections:res.data})
    }).catch((err)=>{
console.log("[Error ]",err)
    }).finally(()=>{
        set({loading:false})
    })
 },
 setSections:(v)=>{set({sections:v})}
}));
