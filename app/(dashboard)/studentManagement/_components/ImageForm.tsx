"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod" 

import { Button } from "@/components/ui/button"
 
 import { useState } from "react"
 import { ImageIcon, Pen, PlusCircle } from "lucide-react"
 
import axios from "axios"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FileUpload } from "@/components/file-upload"
import { Student } from "@prisma/client"
import { toast } from "sonner"
const formSchema = z.object({
  imageUrl: z.string().min(10, {
    message: "Image is required",
  }),
})




interface imageFormprops{
 onChange:(v:string)=>void;
 imageUrl?:string;
  
   
}


const ImageForm:React.FC<imageFormprops> = (
  {onChange,
    imageUrl,
    
    
    
     
  }
) => {

const [isEditing,setIsEditing]=useState(false); 
    


const onSubmit= async(values:z.infer<typeof formSchema>)=>{
  onChange(values.imageUrl);
  setIsEditing(false);
  toast.success("image uploaded");
  }

    return (   
<div
className="
mt-3
bg-slate-50
p-6
rounded-md
">

{isEditing ? (
        <div
        className=" ">
         <div
         className="
         w-full  justify-end flex"> 
         <Button
         onClick={()=>setIsEditing(false)}
          variant="ghost"
            >Cancel</Button>
 </div>         <FileUpload
          endpoint="courseImage"
          onChange={(url)=>{
             
if(url){
  onSubmit({imageUrl:url});
}
          }}
          />

          <div
          className="
          text-xs text-muted-foreground
          mt-4">
 
          </div>
        </div>      
):(
  <div
  className="
  flex
  flex-col
  w-full">
<div
className="
w-full
flex
flex-row
justify-between
items-center">
  <span
  className="text-xl text-slate-800">Student Image</span>
  
  
    <Button
    className=""
    onClick={()=>{setIsEditing(true)}}
    variant={"ghost"}
    > 
   <div
   className="
    
   flex
   flex-row
   items-center
   gap-x-1
   justify-end">
 
   <p>{!imageUrl?(<div
   className="
   flex
   flex-row
   items-center
   gap-x-1
   text-slate-700
   justify-end">
    <PlusCircle className="w-5 h-5"/>
    <p
    className="">Add image</p></div>):(
   <div
   className="
   flex
   text-slate-700
   flex-row
   items-center
   gap-x-1
   justify-end">
   <Pen
   className="w-5 h-5 "/><p className="">Edit Image</p></div>)}</p>
 
 
   </div>
    
    </Button>
  
</div>
<div>
  {imageUrl?(
    <div
    className="
    relative aspect-square
    mt-2

    ">
    <Image
    alt="upload"
    src={imageUrl}
fill
className="object-cover rounded-md"
    />
    </div>
  ):(
    <div
    className="
    flex items-center
    justify-center
    h-60
    bg-slate-200
    rounded-md">
<ImageIcon
className="h-10 w-10 text-slate-500"
/>

    </div>
  )}
</div>
</div>
) }
 
 </div>
    );
}
 
export default ImageForm;