// appState.ts
import { Student } from '@/app/(dashboard)/studentManagement/_components/columns';
import axios from 'axios';
import { stat } from 'fs';
import { toast } from 'sonner';
import {create} from 'zustand';

type AllStudentState = {
  data: Student[]; // Replace with your actual data type
  fetchData: () =>void;
  setData: (data: Student[]) => void;
  fetchStudentById:(id:number)=>void;
 
 
 
  loading:boolean;
  setIsLoading:(v:boolean)=>void;
 
   
};

export const useAllStudentState = create<AllStudentState>((set,get) => ({
  data: [],
 
  
 
  
 
  fetchData:async() => {
    
    const { setIsLoading }=get();
    setIsLoading(true);
    
 

    axios.get("/api/student/getall").then((res)=>{
     
        set( {
          data:res.data
        })
          }).catch((err)=>{
            console.log("management_sync/app/(dashboard)/studentManagement/_components/MainTable.tsx",err);
            toast.error("something went wrong");
          }) .finally(()=>{
            setIsLoading(false);
         
         
            
          })
            
          
         
  },
  setData: (data) => set({ data }),
  fetchStudentById:(id)=>{
    axios.get(`/api/student/${id}`).then((res)=>{
const updatedData=[...get().data];
const index=updatedData.findIndex(student=>student?.id===id);
if(index!==-1){
  updatedData[index]=res.data;
  set({
    data:updatedData
  })
}
    }).catch((err)=>{
      console.log("[Err at AllStudentState fetchStudentById]",err);

    })
  },

 loading:false,
 setIsLoading:(v)=>{set({loading:v})} 

}));


 