import getClassesByTeacherId from "@/app/actions/getClassesByTeacherId";
import AttendanceList from "./_components/AttendanceList"; 
import { auth, currentUser } from "@clerk/nextjs";
import { Attendance, Class, Student, Teacher } from "@prisma/client";
import getTeacherById from "@/app/actions/getTeacherById";

const Attendance=async()=>{
    const {userId }=auth(); 
     
    console.log("UserID",userId);
    

    const teacher:Teacher|null=await getTeacherById(userId!);    
    const classes:(Class&{
        students:Student[],
              attendence:(Attendance&{
                student:Student,
                class:Class
              })[],
      })[]|[]=await getClassesByTeacherId(teacher?.id!);
    
    return <div
    className="p-3">
<AttendanceList
sections={classes}
/>
       
    </div>
}

export default Attendance;