import getClassesByTeacherId from "@/app/actions/getClassesByTeacherId"; 
import { auth, currentUser } from "@clerk/nextjs";
import { Attendance, Class, Grade, Student, Teacher } from "@prisma/client";
import Main from "./_components/Main";
import MainTable from "./_components/MainTable";
import getTeacherById from "@/app/actions/getTeacherById";
import getGradesbyClassId from "@/app/actions/getGradesbyClassId";

const GradesTest=async()=>{

    const {userId }=auth(); 
    
    console.log("UserID",userId);
     
    const teacher:Teacher|null=await getTeacherById( userId!);    
    const classes:(Class&{
        students:Student[];
              attendence:(Attendance&{
                student:Student;
                class:Class;
              })[];
              Grade:(Grade&{
                class:Class,
                student:Student
              })[];
      })[]|[]=await getClassesByTeacherId(teacher?.id!);
     
    return <div>
      <Main 
      sections={classes}
      />
    </div>
}

export default GradesTest;