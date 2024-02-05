 
import { UserButton,auth,useUser } from "@clerk/nextjs";
import HomePage from "./_components/HomePage";
import client from "@/lib/prismadb";
import { Student, TeacherAttendance } from "@prisma/client";
import { format, parse } from "date-fns";
import getClassesByTeacherId from "../actions/getClassesByTeacherId";
import { getTotalStudentsbyTeacherId } from "../actions/getTotalStudentsbyTeacherId";
import { getPresentStudentsTodayByTeacherId } from "../actions/getPresentStudentsTodayByTeacherId";
import { getAbsentStudentsTodayByTeacherId } from "../actions/getAbsentStudentsTodayByTeacherId";
import { getOnLeaveStudentsTodayByTeacherId } from "../actions/getOnLeaveStudentsTodayByTeacherId";
import { getAbsentStudentsProfileTodayByTeacherId } from "../actions/getAbsentStudentProfileToday";
 
export default async function Home(){ 
  const {userId}=auth();
  const today = new Date();
  const formatted=format(today,'dd.MM.yyyy');
//const parsedDate = parse(format(today ,'dd.MM.yyyy'), 'dd.MM.yyyy', new Date());
//const formattedDate = format(parsedDate, 'yyyy-MM-dd');
  if(!userId){
return null;
  }
  const t=await client.teacher.findUnique({
    where:{
      clerkId:userId
    }
  })
   
 const TAttendance=await client.teacherAttendance.findUnique({
    where:{
      date_clerkid:{
        date:formatted,
        clerkid:userId
      }
    }
  })
  





     
 
      return <div>
        <HomePage
        
         tAttendance={TAttendance!}
         clerkId={userId}
         TeacherId={t?.id!}
        />
        </div>;
  
   
   
  
}
 