 "use client";
import { UserButton,auth,useUser } from "@clerk/nextjs";
import HomePage from "./_components/HomePage";
import client from "@/lib/prismadb"; 
import { format, parse } from "date-fns";
 import { useMyInfo } from "../hooks/usemyInfo";
import { useEffect } from "react";
 
export default  function Home(){ 
  const {fetchInfo,userId}=useMyInfo();
  
  const today = new Date();
  const formatted=format(today,'dd.MM.yyyy');

  useEffect(()=>{
    fetchInfo()
  },[])
   if(!userId){
return null;
  }
   
 
  





     
 
      return <div>
        <HomePage
        />
        </div>;
  
   
   
  
}
 