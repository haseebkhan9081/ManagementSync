import {create} from 'zustand';
import { Student } from '../(dashboard)/studentManagement/_components/columns';
import { Class, Teacher } from '@prisma/client';
import axios from 'axios';

type AllsectionsState = {
 sections:(Class&{
    students:Student[],
    teachers:Teacher
 })[],
setSections:(v:(Class&{
    students:Student[],
    teachers:Teacher
})[])=>void;
fetchSections:()=>void;
};

export const useAllsectionsState = create<AllsectionsState>((set) => ({
 sections:[],
 fetchSections:()=>{
    axios.get("/api/class/getAll").then((res)=>{
set({sections:res.data})
    }).catch((err)=>{
console.log("[Error ]",err)
    }) 
 },
 setSections:(v)=>{set({sections:v})}
}));
