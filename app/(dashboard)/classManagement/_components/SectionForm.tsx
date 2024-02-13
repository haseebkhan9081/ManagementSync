"use client";
import FancyMultiSelect from "@/components/fancy-multi-select";
import React, { use, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form" 
import axios from "axios" 
import { useRouter } from "next/navigation"
import { error } from "console";
import { Attendance, Class, Student, Teacher } from "@prisma/client";
import { Loader2 } from "lucide-react";
import TimePicker from "@/components/TimePicker";
import { Input } from "@/components/ui/input";
import { useEditSectionState } from "@/app/hooks/useSectionEditState";
import { useAllStudentState } from "@/app/hooks/AllStudentState";
import { toast } from "sonner";
import { useAllsectionsState } from "@/app/hooks/useAllSectionsState";

const formSchema = z.object({
  name: z.record(z.any()),
  subject: z.string(),
students:z.array(z.record(z.any())).min(1,{
  message:"there must be atleast 1 students in this section"
}),
teacher:z.record(z.any()),
startTime:z.string().min(3),
endTime:z.string().min(3),  
});


const gradesLevel = [
  {
    value: "KG1",
    label: "KG1"
  },
  {
    value: "KG2",
    label: "KG2"
  },
  {
    value: "1st",
    label: "1st Grade"
  },
  {
    value: "2nd",
    label: "2nd Grade"
  },
  {
    value: "3th",
    label: "3rd Grade"
  },
  {
    value: "4th",
    label: "4th Grade"
  },
  {
    value: "5th",
    label: "5th Grade"
  },
  {
    value: "6th",
    label: "6th Grade"
  },
  {
    value: "7th",
    label: "7th Grade"
  },
  {
    value: "8th",
    label: "8th Grade"
  },
  {
    value: "9th",
    label: "9th Grade"
  },
  {
    value: "10th",
    label: "10th Grade"
  }
];
 




 

const SectionForm=({
     
}
     
)=>{ 
 
const [isLoading,setIsLoading]=useState(false);
const [isLoadingcancel,setIsLoadingCancel]=useState(false);
const {fetchSections}=useAllsectionsState()
const {EditSection,setEditSection,setEditTap}=useEditSectionState()
const {data,fetchData}=useAllStudentState(); 
 const [allTeachers,setallTeachers]=useState<Teacher[]>([]);
 useEffect(()=>{
  fetchData();
  axios.get("/api/teacher/all").then((res)=>{
    setallTeachers(res.data)
  }).catch((err)=>{
    console.log("[error app/(dashboard)/classManagement/_components/SectionForm.tsx]",err)
  })
   },[])

const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
             students:EditSection?.students.map((user)=>({
                value:user.id,
                label:user.Name+" "+user.id
              })),
              teacher: {
                value: EditSection?.teachers?.id,
                label: EditSection?.teachers?.firstName+" "+EditSection?.teachers?.lastName,
              },
              name:{
              value:EditSection?.name,
              label:EditSection?.name
              },
              subject:EditSection?.subject,
        startTime:EditSection?.startTime||'',
        endTime:EditSection?.endTime||''
            },
      })


      

     const router=useRouter()
      // 2. Define a submit handler.
     async function onSubmit
     (values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    axios.post(`/api/class`,{
      id:EditSection?.id||null,
    students:values.students,
    teacher:values.teacher,
    name:values.name,
    subject:values.subject,
    startTime:values.startTime,
    endTime:values.endTime
    }).then((response)=>{
      toast.success("Updated!");
    }).catch((err)=>{
      toast.error("something went wrong!")
 console.log("err",err)

    }).finally(()=>{
      fetchSections();
      setIsLoading(false);
      setEditSection(null);
      setEditTap(false);
      

      
    })
    }
    

    return <div
    className="flex
    p-3
    text-customLight
    flex-col">
 <h1 className="text-2xl 
 
  text-center">Create Section</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-customTeal">Section Level</FormLabel>
                  <FormControl>
                   <FancyMultiSelect
                   options={gradesLevel}
                   isSingle={true}
                   label=""
                   onChange={(v)=>{
field.onChange(v);
                   }}
                   value={field.value}
                   />
                  </FormControl>
                  <FormDescription>
                    This is  Class public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-customTeal">Subject</FormLabel>
                  <FormControl>
                    <Input
                    className="text-customGray"
                    {...field}
                    />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="students"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-customTeal">Students {!data.length&&<Loader2 className="text-customTeal animate-spin w-4 h-4"/>}</FormLabel>
                  <FormControl> 
                  
                    <FancyMultiSelect
                    label=""
                    options={data?.map((user)=>({
                      value:user.id,
                      label:user.Name+" "+user.id
                    }))}
                    onChange={(v)=>{
                      field.onChange(v);
                    }}
                value={
                     field.value}
                    
                    isSingle={false}
                    />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
             
            <FormField
              control={form.control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-customTeal">Teacher</FormLabel>
                  <FormControl> 
                  <FancyMultiSelect
                    label=""
                    options={allTeachers?.map((user)=>({
                      value:user.id,
                      label:user.firstName+" "+user?.lastName
                    }))}
                    onChange={(v)=>{
                      field.onChange(v);
                    }}
                value={
                     field.value}
                    
                    isSingle={true}
                    />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-customTeal">Start Time</FormLabel>
                  <FormControl> 
                <TimePicker
                fetchData={()=>{}}
                value={field.value}
                onChange={field.onChange}
                />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-customTeal">End Time</FormLabel>
                  <FormControl> 
                <TimePicker

                fetchData={()=>{}}
                value={field.value}
                onChange={field.onChange}
                />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div
            className="
            flex flex-col 
            w-full

            justify-center">
              

                           <Button
                           
                           
                           className="
                           bg-customTeal
                           hover:bg-customDark"
                           type="submit">
                          {isLoading?(<Loader2 className="
                          h-6 w-6 animate-spin"/>):(
                            <div>Save Changes</div>
                          )}
</Button>
 
</div>
         </form>
        </Form>
 
</div>
}

export default SectionForm;