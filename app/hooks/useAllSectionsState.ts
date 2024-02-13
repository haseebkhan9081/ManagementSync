import {create} from 'zustand';
import { Student } from '../(dashboard)/studentManagement/_components/columns';
import { Class, Teacher } from '@prisma/client';
import axios from 'axios';

type AllsectionsState = {
 sections:(Class&{
    students:Student[],
    teachers:Teacher
 })[],
 loading:boolean,
 setLoading:(v:boolean)=>void,
setSections:(v:(Class&{
    students:Student[],
    teachers:Teacher
})[])=>void;
fetchSections:()=>void;
};

export const useAllsectionsState = create<AllsectionsState>((set) => ({
 sections:[],
 loading:false,
 setLoading:(v)=>{set({loading:v})},
 fetchSections:()=>{
    set({loading:true})
    axios.get("/api/class/getAll").then((res)=>{
set({sections:res.data})
    }).catch((err)=>{
console.log("[Error ]",err)
    }).finally(()=>{
        set({loading:false})
    }) 
 },
 setSections:(v)=>{set({sections:v})}
}));
