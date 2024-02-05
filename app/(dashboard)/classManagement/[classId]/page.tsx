import { Attendance, Class, Student, Teacher } from "@prisma/client";
import SectionForm from "./_component/SectionForm";
import getSectionById from "@/app/actions/getSectionByid";
 
import getAllTeachers from "@/app/actions/getAllTeachers";
import getAllStudents from "@/app/actions/getAllStudents";

 


const ClassId=async(
    {params}:{
        params:{classId:number}
    }
)=>{ 
 


const section:Class&{
  students:Student[],
  teachers:Teacher,
  attendence:Attendance[]
}|null=await getSectionById(params.classId);
const allTeachers:Teacher[]=await getAllTeachers();
const allStudents:Student[]=await getAllStudents();
   
    
   
   return <SectionForm
    allStudents ={allStudents}
    allTeachers ={allTeachers}
    section={section!} 
    />
  
  
    }


export default ClassId;