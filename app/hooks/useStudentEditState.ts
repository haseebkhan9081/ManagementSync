import { create } from "zustand";
import { Student } from "../(dashboard)/studentManagement/_components/columns"



type studentEditState={
    profile:Student|null,
    setEditProfile:(p:Student)=>void;
    edit:boolean,
    setEdit:(v:boolean)=>void;
}
export const useStudentEditState=create<studentEditState>((set)=>({
    edit:false,
    profile:null,
    setEdit:(v)=>{set({edit:v})},
    setEditProfile:(p)=>{set({profile:p})}
})

)