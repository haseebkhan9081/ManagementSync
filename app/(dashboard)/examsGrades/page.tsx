import getClassesByTeacherId from "@/app/actions/getClassesByTeacherId"; 
import { auth, currentUser } from "@clerk/nextjs";
import { Attendance, Class, Grade, Student, Teacher } from "@prisma/client";

import Main from "./_components/Main";
 
const GradesTest=async()=>{

    
     
     
    return <div
    className="bg-customDark
    
    ">
      <Main 
 
      />
    </div>
}

export default GradesTest;