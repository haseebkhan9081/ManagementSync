import {create} from 'zustand';
 
import axios from 'axios';

type MyInfo = {
  admin:boolean,
  userId:string,
  visitor:boolean,
  setUser:(a:boolean,t:boolean,v:boolean,u:string)=>void;
  teacher:boolean,
 teacherId:number|null,
fetchInfo:()=>void;
};

export const useMyInfo = create<MyInfo>((set) => ({
  teacherId:null,
  setUser:(a,t,v,u)=>{
  set({admin:a, teacher:t, visitor:v,userId:u})
  },
  userId:"",
  admin:false,
  visitor:false,
  teacher:false,
fetchInfo:()=>{
axios.get("/api/myinfo").then((res)=>{
    set({teacherId:res.data.teacherId,
    admin:res.data.admin,
  teacher:res.data.teacher,
visitor:res.data.visitor,
userId:res.data.clerkId
},
       
    )
})
}
 
}));
