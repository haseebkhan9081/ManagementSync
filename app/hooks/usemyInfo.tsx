import {create} from 'zustand';
 
import axios from 'axios';

type MyInfo = {
 teacherId:number|null,
fetchTeacherId:()=>void;
};

export const useMyInfo = create<MyInfo>((set) => ({
  teacherId:null,
fetchTeacherId:()=>{
axios.get("/api/myinfo").then((res)=>{
    set({teacherId:res.data.id}
    )
})
}
 
}));
