"use client" 
import { Button } from "@/components/ui/button";
import { PackagePlusIcon, PlusCircleIcon } from "lucide-react";
import { Suspense, lazy, useState } from "react";  
const MainTable =lazy(()=>import("./MainTable"))
const NewAttendance=lazy(()=>import("./NewAttendance").then((module)=>({default:module?.NewAttendance})))
interface AttendanceListprops{
    
}
const AttendanceList:React.FC<AttendanceListprops>= ({
    
})=>{ 
const [tap,setTap]=useState(false);

    return (

        <div
         >
            <div
            className="flex flex-row-reverse
            w-full
            justify-between
            mb-6
             ">
 <Button
 onClick={()=>setTap(!tap)}
 variant="default"
 className="w-full
 bg-customTeal
 hover:bg-customGray
 gap-x-2"
 >

    {tap?"Cancel":<>
    <PlusCircleIcon/>
New Attendance</>}
    
 </Button>
     

            </div>
            {tap&&<Suspense
 fallback={<div>loading...</div>}>
    <NewAttendance/>
    </Suspense>}
             <Suspense
             fallback={<div>loading...</div>}>
                <MainTable/></Suspense>
 
        </div>
    )
}

export default AttendanceList;