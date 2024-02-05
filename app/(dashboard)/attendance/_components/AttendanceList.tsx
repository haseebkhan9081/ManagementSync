"use client"
import { Button } from "@/components/ui/button"
import { Attendance, Class, Student } from "@prisma/client";

import MainTable from "./MainTable";
import Link from "next/link";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, parse } from "date-fns";

interface AttendanceListprops{
    sections:(Class&{
        students:Student[],
              attendence:(Attendance&{
                student:Student,
                class:Class
              })[],
      })[]|[]
}
const AttendanceList:React.FC<AttendanceListprops>= ({
    sections
})=>{
const [isLoading,setIsLoading]=useState(false);
const router=useRouter()

    return (

        <div>
            <div
            className="flex flex-row-reverse
            w-full
            justify-between
            mb-6
             ">
 
    <Button
    type="button"
    onClick={()=>{
        const today = new Date();
const parsedDate = parse(format(today ,'dd.MM.yyyy'), 'dd.MM.yyyy', new Date());
const formattedDate = format(parsedDate, 'yyyy-MM-dd');

        router.push(`/attendance/${0}/${encodeURIComponent(formattedDate)}`);

setIsLoading(true)
    }}
    className="flex flex-row
    gap-x-2
    w-full"
    >
        {isLoading?(
<div><Loader2
className="w-6 h-6 animate-spin"/></div>
        ):(
            <div
            className="flex flex-row
            gap-x-2
            w-full
            items-center
            justify-center"> <div><PlusCircle
            className="w-6 h-6"/>
            </div>
            <div><p>
                New Attendance</p>
                </div>
                </div>
        )}
      </Button>
 
            </div>
<MainTable
//@ts-ignore
sections={sections}
/>
 
        </div>
    )
}

export default AttendanceList;