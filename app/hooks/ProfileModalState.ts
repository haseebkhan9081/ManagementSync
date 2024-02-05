import {create} from 'zustand';
import { Student } from '../(dashboard)/studentManagement/_components/columns';

type StudentProfileState = {
  isOpen: boolean;
  profile:Student|null;  
  setIsOpen: (data: boolean) => void;
  setProfile:(v:Student)=>void;
};

export const useStudentProfileState = create<StudentProfileState>((set) => ({
profile:null,
setProfile:(v)=>set({profile:v}),
  isOpen: false,
  setIsOpen: (data) => set({isOpen:data}),
}));
