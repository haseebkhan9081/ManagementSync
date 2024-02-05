"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, PlusCircle, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ClassManagement=()=>{
    const [isLoading,setIsLoading]=useState(false);
const router=useRouter()
    const onClick=()=>{
    setIsLoading(true);
  axios.get("/api/class").
  then((response)=>{
toast(`All the information is required\nplease fill accordingly`,{
    style:{
        borderRadius: '10px',
      background: '#333',
      color: '#fff',
    }
});
router.push(`/classManagement/${response.data.id}`);

  }).catch((err)=>{
console.log("[ERROR classManagement]",err);
toast.error("error creating new class");
  }).finally(()=>{
    setIsLoading(false);
  })  
}

    return <div
    className="p-3">
        <div
        className="flex
        flex-col">
<div className="justify-between  flex flex-row-reverse">
    <Button
    type="button"
    className="gap-x-2"
    onClick={onClick}
    >
      {isLoading && <Loader2 className="
      h-6 w-6 animate-spin" />}  
        
       {!isLoading && <div
       className="flex flex-row items-center
       justify-center gap-x-2
       ">
        <p>New Class</p>
       <PlusCircleIcon/></div>}
    </Button>
</div>
        </div>
    </div>
}

export default ClassManagement;