import {create} from 'zustand';
import { Student } from '../(dashboard)/studentManagement/_components/columns';

type useTeacherAttendanceState = {
   AttendanceDate:string,
   setAttendanceDate:(v:string)=>void;
};

export const useTeacherAttendanceDateState = create<useTeacherAttendanceState>((set) => ({
AttendanceDate:"",
setAttendanceDate(v) {
    set({AttendanceDate:v})
}, 
}));
