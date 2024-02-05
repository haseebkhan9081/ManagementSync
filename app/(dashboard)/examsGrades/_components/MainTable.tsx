"use client";
import { Class, Student } from "@prisma/client"
import { Attendance, columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";
import Select from "@/components/fancy-multi-select";
import DatePicker from "@/components/datePicker";
import { Input } from "@/components/ui/input";
import { format, formatDistance } from "date-fns";

 
interface MainTableProps{
  sections: (Class&{
    students:Student[];
          attendence:(Attendance&{
            student:Student;
            class:Class;
          })[];
  })[]|[];
}
const MainTable:React.FC<MainTableProps>=({
    sections
})=> {
  const [classId,setClassId]=useState<Record<string,any>>({value:0,label:"Please Select a Section to view Students"})
const [date,setDate]=useState(new Date());
const [total,setTotal]=useState<number>();
const [result,setResult]=useState<Attendance[]>();
const [studentsToDisplay,setstudentsToDisplay]=useState(sections?.find((section)=>section.id===classId.value))
 const [testName,setTestName]=useState("");
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
  return (
    <div>
    <div
    className="
    flex
    flex-row
    w-full
    gap-x-2">
      <div
      className="w-[300px]
      flex
      flex-col">
      <Select
      value={classId}
      options={sections?.map((section)=>(
        {
          value:section?.id,
          label:section.name+' '+section?.subject
        }))}
         onChange={(v)=>{
          setClassId(v);
         }}
         isSingle={true}
         label="Section"
      />
      </div>
      <Input
      value={testName}
      onChange={(v)=>{
        setTestName(v.target.value)
      }}
      className="
      text-lg
      text-slate-800
      focus-visible:ring-0
      "
      placeholder="Test Topic"
      />
     </div>




     <div
     className="flex mt-2 gap-x-2 flex-row
     w-full
     justify-between"> 
     <div
     className="flex
     w-[200px]"> <DatePicker
     
      date={date}
      onChange={setDate}
      />
      </div>
      <Input
      value={total}
      type="number"
      className="focus-visible:ring-0"
      placeholder="Total Marks"
      onChange={(v)=>{
        setTotal(Number(v.target.value))
      }}
      />
      </div>
    <div className="w-full">
      <DataTable columns={columns} date={format(date,'dd.MM.yyyy')} Topic={testName} Total={total!} data={result||[]} />
    </div>
    </div>
  )
}
export default MainTable;