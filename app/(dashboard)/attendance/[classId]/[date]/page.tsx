import Select from "@/components/fancy-multi-select";
import Main from "./_components/Main";
import { Attendance, Class, Student, Teacher } from "@prisma/client";
import getClassesByTeacherId from "@/app/actions/getClassesByTeacherId";
import { auth, currentUser } from "@clerk/nextjs"; 
import getTeacherById from "@/app/actions/getTeacherById";

const NewAttendance=async({params}:{
    params:{
        classId:number,
        date:string
        
    }
})=>{
    console.log("date in NewAttendance",params.date);
    console.log("classId in NewAttendance",params.classId);
    
    const {userId}=auth();  
    console.log("UserID",userId); 
    const teacher:Teacher|null=await getTeacherById(userId!);      
    const classes:(Class&{
        students:Student[],
              attendence:Attendance[],
      })[]|[]=await getClassesByTeacherId(teacher?.id!);

 
    return <div
    
    className="p-3
    w-full
    h-full">
<Main
sections={classes}
classID={Number(params.classId)}
dated={params.date}
/>
       
    </div>
}

export default NewAttendance;