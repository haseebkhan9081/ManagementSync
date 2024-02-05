"use client"
import { Editor } from "@/components/editor"
import Select from "@/components/fancy-multi-select"
import { Preview } from "@/components/preview"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Attendance, Class, Student } from "@prisma/client"
import { ChevronLeft, Loader2, Pen, PlusCircle, Save } from "lucide-react"
import { useEffect, useState } from "react"
import StudentLabel from "./StudentLabel"
import DatePicker from "@/components/datePicker"
import Link from "next/link"
import { format } from "date-fns"
 
interface GridProps{
sections:(Class&{
  students:Student[],
        attendence:Attendance[],
})[]
,
classID:number,
dated:string
}
const Main:React.FC<GridProps> =({
    sections,
    classID,
    dated
})=>{
  const [isLoading,setIsLoading]=useState(false);
const [classId,setClassId]=useState<Record<string,any>>({value:sections?.find((section)=>section.id===classID)?.id||0,label:sections?.find((section)=>section.id===classID)?.name||"Select Class Name"});
const [isEditing,setIsEditing]=useState(false);
const [studentsToDisplay,setstudentsToDisplay]=useState(sections?.find((section)=>section.id===classId.value))
 
const [date,setDate]=useState<Date>(new Date(dated.split('.').reverse().join('-'))||new Date());
const [result,setResult]=useState<Attendance[]>();

useEffect(() => {
  const formattedDate = format(date, 'dd.MM.yyyy');
  const selectedSection = sections?.find((section) => section.id === classId.value);

  // Filter attendance for the selected date
  const newResult = selectedSection?.attendence.filter(
    (attendance) => attendance.date === formattedDate
  ) || [];

  // Set the entire result state with the new attendance
  setResult(newResult);

  // Set the studentsToDisplay state
  setstudentsToDisplay(selectedSection);

  // Additional logic if needed...

  console.log("accumulated attendance", result);
}, [date, classId.value, sections]);
   
const [topicDescription,setTopicDescription]=useState<string>(result?.[0]?.topic||"");

  
return  <div
  className="flex flex-col
  p-3
  w-full
  h-full
  space-y-6
  ">
 <Link
className="flex
flex-row
gap-x-2"
 href={"/attendance"}>
 <ChevronLeft
  onClick={()=>setIsLoading(true)}
 /> 
 {isLoading&&(<Loader2
 className="w-6 h-6 animate-spin"/>)}
   </Link>
<div
className="flex flex-col
space-y-2
justify-center
items-center
w-full
">
<div className="w-[300px]">
<Select
isSingle={true}
label=""
value={classId}
onChange={(v)=>{
  setClassId(v)
}}
options={sections?.map((section)=>(
    {
        value:section?.id,
        label:section?.name+" "+section?.subject
    }
))}
/></div>
<div
className="w-[300px]">
  <div
  className="ring-1
  ring-slate-300
  rounded-sm
  text-lg">
{isEditing?(
  <div
  className="
  flex
  flex-row
  relative
  ">
  <Editor
  
  onChange={(v)=>{
    setTopicDescription(v!);
  }}
  value={topicDescription!}
  />
  <Save
  className="w-6 
  absolute
  h-6
  justify-end
  right-2
  top-2
  "
  onClick={()=>setIsEditing(false)}
  />
  </div>


):(
  <div>
   
    
    
 
  <div
  className="flex flex-row justify-center
  items-center
  gap-x-6
  relative">
<Preview
value={result?.[0]?.topic||topicDescription!}/>
<PlusCircle
className="
top-2
right-2
w-6
absolute
h-6
"
onClick={()=>setIsEditing(true)}
/>
</div>
</div>
)}

  </div>


</div>
<div>
  <DatePicker
  date={date}
  onChange={setDate}/>
</div>
  
</div>
{studentsToDisplay?.students.map((student)=>(
  <div
  key={student?.id}>
  <StudentLabel
  result={result!}
  absent={result?.find((att)=>(att.studentId===student?.id))?.absent||false}

  present={result?.find((att)=>(att.studentId===student?.id))?.present||false}
  Reason={result?.find((att)=>(att.studentId===student?.id))?.reason||""}
  leave={result?.find((att)=>(att.studentId===student?.id))?.leave||false}
 
  date={date}
  classId={studentsToDisplay?.id}
  topic={result?.[0]?.topic||topicDescription!}
  student={student}/>
</div>
))} 
  </div>
     
}

export default Main;