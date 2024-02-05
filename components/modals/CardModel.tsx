"use client";
import StudentCard from "@/app/(dashboard)/studentManagement/_components/StudentCard";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Student } from "@prisma/client";
import { useRouter } from "next/navigation";
  
interface ConfirmationModalProps{
    children:React.ReactNode;
    student:Student;
    

}

  const ConfirmationModal=({
children,
 student
  }:ConfirmationModalProps)=>{
const router=useRouter();
return (
<AlertDialog>
  <AlertDialogTrigger asChild>
    {children}
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader className="flex flex-row justify-between">
       <StudentCard model student={student}/>
<div className="w-full
flex
flex-col">
<div>Attendence</div>

<div>overall performance</div>

<div>Class and section</div>
<div>leaves</div>
<div>unInformed absents</div>

<div>has done more than three leaves this month </div>
</div>
    </AlertDialogHeader>
    <AlertDialogFooter className="flex flex-row justify-between items-center">
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>{
        router.push(`/studentManagement/${student?.id}`)
      }} >Edit</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>



);
  }

  export default ConfirmationModal;