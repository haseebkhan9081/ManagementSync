import {create} from 'zustand';
import { Student } from '../(dashboard)/studentManagement/_components/columns';
import { Class } from '@prisma/client';

type StudentProfileState = {
   sections:Class[]|[],
   setSections:(v:Class[])=>void;
   fetchSections:()=>void;
};

export const useStudentProfileState = create<StudentProfileState>((set) => ({
 sections:[],
 setSections(v) {
     set({sections:v})
 },
 fetchSections() {
    axios.get("/api/class/getCurrent").then((res)=>{
set({sections:res.data})
    }).catch((err)=>{
console.log("[Error ]",err)
    }) 
 }
}));
