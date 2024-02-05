import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { Student } from "@prisma/client"
import Image from "next/image"
  interface StudentCardparams{
    student:Student,
    model?:boolean;
  }
const StudentCard:React.FC<StudentCardparams>=({
    student,
    model
})=>{
  console.log("recived student at Card",student);
    return <div>
<Card
className="hover:z-50
bg-sky-50
hover:shadow-lg
hover:ring-sky-700
">
  <div
  className=" 
  justify-center
  items-center
  flex p-1
  
  "
  >
   <div
   className={cn(
`w-[100px]
aspect-square

relative `,
model && 'w-[220px]'
   )}>
    <Image
    className="rounded-full  object-cover"
    alt={student?.Name}
    src={student.imageUrl||"/images/placeholder.jpg"}
    fill
     
    />
    </div>
    </div>
     
   
    <div
    className={cn(
      `flex
      font-normal items-center
       text-sm text-slate-700 
       text-muted-foreground
         w-full p-1 flex-col`,
         model && 'text-xl text-slate-800'
    )}>
    <p>{student?.Name}</p>
    <p>Roll#:{student?.id}</p>
    <p>age:{student?.age}</p>
    <p>Father:{student?.fatherName}</p>
    <p className="line-clamp-1">Phone:{student?.Contact}</p>
    <p className="line-clamp-1">Active||Alumni</p>

    </div>
   
  
</Card>
</div>
}
export default StudentCard;