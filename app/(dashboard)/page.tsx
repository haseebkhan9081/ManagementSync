 "use client";
import { UserButton,auth,useUser } from "@clerk/nextjs";
import HomePage from "./_components/HomePage";
import client from "@/lib/prismadb"; 
import { format, parse, set } from "date-fns";
 import { useMyInfo } from "../hooks/usemyInfo";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
 
export default  function Home(){ 
  const {fetchInfo,userId,setUser}=useMyInfo();

  const today = new Date();
  const formatted=format(today,'dd.MM.yyyy');

  useEffect(()=>{
  axios.get("/api/user/create").then((res)=>{
    toast.success("loged in");
  setUser(res.data?.admin,res.data?.teacher,res.data?.visitor,res.data?.clerkId)
  }).catch((err)=>{
    toast.error("user not created");
  })
    
  },[])
   if(!userId){
return null;
  }
   
 
  





     
 
      return <div>
        <HomePage
        />
        </div>;
  
   
   
  
}
 