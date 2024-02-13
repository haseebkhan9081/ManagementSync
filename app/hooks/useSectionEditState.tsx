import {create} from 'zustand';
 import { Class, Teacher ,Student} from '@prisma/client';

type EditSectionState = {
  EditSection:Class&{
    students:Student[],
    teachers:Teacher
  }|null,
EditTap:boolean,
setEditTap:(v:boolean)=>void,
  setEditSection:(v:Class&{
    students:Student[],
    teachers:Teacher
  }|null)=>void;
};

export const useEditSectionState = create<EditSectionState>((set) => ({
 EditTap:false,
 setEditTap:(v)=>(set({EditTap:v}))
    ,
    EditSection:null,
 setEditSection:(v)=>{ set({EditSection:v})}
}));
