 "use client"
 import { useMyInfo } from "@/app/hooks/usemyInfo";
import AttendanceList from "./_components/AttendanceList"; 
import { useEffect } from "react";
 


const Attendance= ()=>{
   
   const {fetchInfo}=useMyInfo();
   useEffect(()=>{
fetchInfo()
   },[]) 

   
    return <div
    className="p-3
    bg-customDark">
<AttendanceList
 
/>
       
    </div>
}

export default Attendance;