 "use client";
import { useMyInfo } from "@/app/hooks/usemyInfo";
import Main from "./_components/Main";
import { useEffect } from "react";
 
const GradesTest= ()=>{
  const {fetchInfo}=useMyInfo();
   useEffect(()=>{
fetchInfo()
   },[])
    return <div
    className="bg-customDark
    
    ">
      <Main 
      />
    </div>
}

export default GradesTest;