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
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { error } from "console";
import { Attendance, Class, Student, Teacher } from "@prisma/client";
import { Loader2 } from "lucide-react";
import TimePicker from "@/components/TimePicker";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.record(z.any()),
  subject: z.string(),
students:z.array(z.record(z.any())).min(2,{
  message:"there must be atleast 2 students in this section"
}),
teacher:z.record(z.any()),
startTime:z.string(),
endTime:z.string(),  
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
const subjectsList = [
  {
    value: "math",
    label: "Mathematics"
  },
  {
    value: "science",
    label: "Science"
  },
  {
    value: "english",
    label: "English"
  },
  {
    value: "history",
    label: "History"
  },
  {
    value: "geography",
    label: "Geography"
  },
  {
    value: "physics",
    label: "Physics"
  },
  {
    value: "chemistry",
    label: "Chemistry"
  },
  {
    value: "biology",
    label: "Biology"
  },
  {
    value: "computerScience",
    label: "Computer Science"
  },
  {
    value: "physicalEducation",
    label: "Physical Education"
  },
  {
    value: "languageArts",
    label: "Language Arts"
  }
];




interface SectionFormProps{
    section:Class&{
        students:Student[],
        teachers:Teacher,
        attendence:Attendance[]
    };
    allTeachers:Teacher[],
    allStudents:Student[]
}

const SectionForm:React.FC<SectionFormProps>=({
    section,
    allStudents,
    allTeachers
}
     
)=>{ 

const [isLoading,setIsLoading]=useState(false);
const [isLoadingcancel,setIsLoadingCancel]=useState(false);

  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
             students:section?.students.map((user)=>({
                value:user.id,
                label:user.Name+" "+user.id
              })),
              teacher: {
                value: section?.teachers?.id,
                label: section?.teachers?.firstName+" "+section?.teachers?.lastName,
              },
              name:{
              value:section?.name,
              label:section?.name
              },
              subject:section?.subject,
        startTime:section?.startTime||'',
        endTime:section?.endTime||''
            },
      })




     const router=useRouter()
      // 2. Define a submit handler.
     async function onSubmit
     (values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    axios.patch(`/api/class/${section.id}`,{
    students:values.students,
    teacher:values.teacher,
    name:values.name,
    subject:values.subject,
    startTime:values.startTime,
    endTime:values.endTime
    }).then((response)=>{
      toast.success("Section Updated!");
      router.refresh()
      router.push("/classManagement");
    }).catch((err)=>{
      toast(`error creating section\nYou can not have two section with identical name`,{
        icon:"❌"
      });
    }).finally(()=>{
      setIsLoading(false);
      
    })
   

    }
    

    return <div
    className="flex
    p-3
    flex-col">
 <h1 className="text-2xl text-slate-900
  text-center">Create Section</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Level</FormLabel>
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
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
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
                  <FormLabel>Students</FormLabel>
                  <FormControl> 
                    <FancyMultiSelect
                    label=""
                    options={allStudents?.map((user)=>({
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
                  <FormLabel>Teacher</FormLabel>
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
                  <FormLabel>Start Time</FormLabel>
                  <FormControl> 
                <TimePicker
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
                  <FormLabel>End Time</FormLabel>
                  <FormControl> 
                <TimePicker
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
            flex flex-row 
            w-full
            justify-between">
              

                           <Button type="submit">
                          {isLoading?(<Loader2 className="
                          h-6 w-6 animate-spin"/>):(
                            <div>Submit</div>
                          )}
</Button>
<Button
type="button"
variant={"ghost"}
onClick={()=>{
  setIsLoadingCancel(true);
  router.push("/classManagement");
setIsLoadingCancel(false)
}}
>
{isLoadingcancel?(<Loader2 className="
                          h-6 w-6 animate-spin"/>):(
                            <div>Cancel</div>
                          )}

</Button>
</div>
         </form>
        </Form>
 
</div>
}

export default SectionForm;