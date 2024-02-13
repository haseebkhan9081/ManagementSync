"use client";
import { useEditSectionState } from "@/app/hooks/useSectionEditState";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Edit, Loader2, PlusCircle, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, lazy, useState } from "react"; 
const AllSections=lazy(()=>import("./_components/AllSections").then((module)=>({default:module.AllSections})));
const SectionForm=lazy(()=>import("./_components/SectionForm"))
const ClassManagement=()=>{

  const {setEditTap,EditTap,setEditSection}=useEditSectionState();
 
    return <div
    className="p-3
    bg-customDark">
 <div
 className="flex
 flex-col
 space-y-4
 w-full">
  <div
  className="w-full">
<Button

onClick={()=>{
  setEditSection(null);
  setEditTap(!EditTap)

}}
className="flex-row
bg-customTeal
hover:bg-customGray
w-full
z-50
gap-x-2"

>
  {EditTap?"Cancel":<><PlusCircleIcon/>
  New Section</>}</Button>
  </div>
  {EditTap&&<div>
  <div
  className="bg-customGray
  rounded-lg
  z-50">
    <Suspense
    fallback={<div>...loading</div>}>
  <SectionForm
  
  />
  </Suspense>
  </div>
  </div>}
  <div>
    <Suspense
    fallback={<div>...loading</div>}>
    <AllSections />
    </Suspense>
  </div>
 </div>
    </div>
}

export default ClassManagement;