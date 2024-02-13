"use client"

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
import { Input } from "@/components/ui/input"
import ImageForm from "./ImageForm" 
import { Class } from "@prisma/client"
import axios from "axios" 
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import Select from "@/components/fancy-multi-select"
import {   useInView } from "react-intersection-observer"
import { toast } from "sonner"
import { useAllStudentState } from "@/app/hooks/AllStudentState"
import { Student } from "./columns"
 

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  age: z.string().min(2, {
    message: "age must be at least 2 characters.",
  }),
  imageUrl: z.string().optional(),
  FatherName: z.string().min(2,{
    message:"father's name must be atleast 2 characters"
  }),
  phone: z.string().min(11, {
    message: "phone must be at least 11 characters.",
  }),
  adress: z.string(),
  sections:z.array(z.record(z.any()))
  
})
interface AdmissionFormProps{
  onChange:(v:boolean)=>void;
  profile:Student|null;
   
}
const  AdmissionForm:React.FC<AdmissionFormProps>=({
   onChange,
   profile
  
} )=>{
   
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
             adress:profile?.Address,
             age:profile?.age,
             FatherName:profile?.fatherName,
             imageUrl:profile?.imageUrl,
             name:profile?.Name,
             phone:profile?.Contact,
             sections:profile?.classes?.map((sec)=>(
              {
                value:sec?.id,
                label:sec?.name+" "+sec?.subject
              }
             ))
      }
    })

    const [sections,setSections]=useState<Class[]>([])
    const [ref,InView]=useInView({
      threshold:0.1,
      triggerOnce:true,
onChange:(inView)=>{
if(inView){
  fetchSections();
}
}
    })
      const fetchSections=()=>{
        axios.get("/api/class/getAll").then((res)=>{
          setSections(res.data);
        }).catch((err)=>{
          console.log("[ERROR  management_sync/app/(dashboard)/studentManagement/_components/AdmissionForm.tsx]",err);
        })
      }
      const {fetchData}=useAllStudentState()
     const router=useRouter()
         const [isloading,setIsLoading]=useState(false);
      // 2. Define a submit handler.
     async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      if(profile&&profile?.id){
await axios.patch(`/api/student/${profile?.id}`,{
              name:values?.name,
              age: values?.age,
              FatherName: values?.FatherName,
              phone: values?.phone,
              adress:values?.adress,
              imageUrl:values?.imageUrl,
              sections:values?.sections,
}).then((response)=>{
  toast.success("updated",{
   description:`Roll number = ${response.data.id}`
  })
}).catch((err)=>{
 console.log("[ERROR StudentManagement/[studentId]]",err);
 toast.error("something went wrong");
}).finally(()=>{
 router.refresh();
  setIsLoading(false);
  fetchData()
  onChange(false);
  
})

      }else{
      await axios.post(`/api/student`,{
            name:values?.name,
              age: values?.age,
              FatherName: values?.FatherName,
              phone: values?.phone,
              adress:values?.adress,
              imageUrl:values?.imageUrl,
              sections:values?.sections,
        }).then((response)=>{
             toast.success("created",{
              description:`Roll number = ${response.data.id}`
             })
        }).catch((err)=>{
            console.log("[ERROR StudentManagement/[studentId]]",err);
            toast.error("something went wrong");
        }).finally(()=>{
            router.refresh();
             setIsLoading(false);
             fetchData()
             onChange(false);
             
        })}
      }
      return (
        <div
        ref={ref} className="p-3
        w-full
        ">
            <h1 className="text-2xl text-customLight text-center">Admission Form</h1>
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-customTeal">Student Name</FormLabel>
                  <FormControl>
                    <Input
                    className="bg-customLight
                    text-customGray" placeholder="Enter student name" {...field} />
                  </FormControl>
                  <FormDescription
                  className="text-customLight">
                    This is Student public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-customTeal">Age</FormLabel>
                  <FormControl>
                    <Input
                    className="text-customGray
                    bg-customLight" placeholder="enter age i.e (15 years)" {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="FatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-customTeal">Father&apos;s Name</FormLabel>
                  <FormControl>
                    <Input
                    className="text-customGray
                    bg-customLight
                    " placeholder="enter father or guardian name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-customTeal">Contact number</FormLabel>
                  <FormControl>
                    <Input
                    className="text-customGray
                    bg-customLight" placeholder="enter guardian contact" {...field} />
                  </FormControl>
                  <FormDescription
                  className="text-customLight">
                    This information will be used to contact in case of emergency ,
                    you can enter multiple phone numbers as well seperated by comma
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-customTeal">Profile Picture</FormLabel>
                  <FormControl>
                    <ImageForm 
                    onChange={field.onChange}
                    
                    imageUrl={field.value}/>
                     </FormControl>
                    <FormDescription
                    className="text-customLight">

                    This is student&apos;s public profile picture.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sections"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-customTeal">Section</FormLabel>
                  <FormControl>
                   <Select
                   
                   label=""
                   options={sections?.map((section)=>(
                    {
                      value:section?.id,
                      label:section?.name+" "+section?.subject
                    }
                   ))}
                   onChange={(v)=>{
                    field.onChange(v)
                   }}
                  isSingle={false}
                   value={field.value}
                   />
                     </FormControl>
                    <FormDescription
                    className="text-customLight">
                    This is student&apos;s public profile picture.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="adress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-customTeal">Adress</FormLabel>
                  <FormControl>
                    <Input
                    className="bg-customLight
                    text-customGray" placeholder="enter the adress " {...field} />
                  </FormControl>
                  <FormDescription
                  className="text-customLight">
                   This is optional,if you want to you can leave it blank
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
            className="
            flex
            h-full
            flex-col
            w-full
            justify-center items-center
            ">
            <Button 
            className="w-full
            bg-customTeal
            hover:bg-customDark"
            type="submit">
              
            {isloading?(
                <Loader2
                className="h-6 w-6
                animate-spin"/>
              ):(<div>
                Submit
              </div>)}
            </Button>
             
            </div>
          </form>
        </Form>
        </div> 
)}

export default AdmissionForm;