"use client";
import { format } from "date-fns"; 
const AttendanceButton=lazy(()=> (
    import("./AttendanceButton"))
    ); 
import { useUser } from "@clerk/nextjs";
import {   TeacherAttendance } from "@prisma/client";
 import { lazy,Suspense } from "react"; 
import { useRouter } from "next/navigation";
   
 import { Loader2 } from "lucide-react";  
import { useAllStudentState } from "@/app/hooks/AllStudentState";
const AcademicWarnings=lazy(()=>import("./AcademicWarnings").then((module)=>({default:module.AcademicWarnings})))
const StudentsWarning=lazy(()=>import("./StudentsWarning").then((module)=>({default:module.StudentsWarning})))
const StudentAttendnceBox=lazy(()=> (
    import("./StudentAttendnceBox").then((module=> ({default:module.StudentAttendnceBox}))
    
    ))); 
const TeacherAttendnceBox=lazy(()=> (
 import("./TeacherAttendanceBox")));
const StudentFine=lazy(()=>(
  import("./StudentFine").then((module)=>({default:module.StudentFine}))
));

interface HomePageProps{
   
    tAttendance:TeacherAttendance,
    clerkId:string
    TeacherId:number,
     
}
const HomePage:React.FC<HomePageProps>=({
    tAttendance,
    clerkId,
    TeacherId,
     
})=>{
    const today = new Date(); 
     
    const formattedDate = format(today, 'EEEE, MMMM do, yyyy');
    const dateToday=format(today ,'dd.MM.yyyy');
    
    const router=useRouter();



    const { isSignedIn, user, isLoaded } = useUser();
    
    if (!isLoaded) {
        return null;
      }
     
 
    
      if (isSignedIn) {
   
    return <div
    className="
    flex
    flex-col
    space-y-4
    p-6 
    bg-customDark
    text-customLight">
        <div
        className="flex
        flex-col">
        <h1
        className="text-4xl">Hi, {user?.firstName}</h1>
        <p
        className="text-xs
        text-customLight
        ">{formattedDate}</p>


        <div
        className="flex
        flex-row
        justify-center
        items-center
        mt-2
        mb-8
        ">
 
<Suspense
fallback={
  <div
  className="w-full
  items-center
  justify-center flex
  flex-row gap-x-2">
<Loader2
className="animate-spin
text-customTeal
w-8
h-8"/> 
  </div>
}>
            <AttendanceButton
            id={tAttendance?.id}
            Arrival={tAttendance?.Arrival||""}
            departure={tAttendance?.departure||""}
            clerkId={clerkId}
            date={tAttendance?.date||dateToday}
            isAbsent={tAttendance?.isAbsent||false}
            isPresent={tAttendance?.isPresent||true}
            TeacherId={TeacherId}
            />
            </Suspense>
        </div>

 </div>  

<div
className=" 
flex
flex-col
justify-center
items-center

space-y-4"

>
  

  
    <Suspense  fallback={
      <div
      className="w-full
      items-center
      justify-center flex
      flex-row gap-x-2">
<Loader2
className="animate-spin
text-customTeal
w-8
h-8"/> 
      </div>
      
    }>
    <TeacherAttendnceBox
  />
  </Suspense>
  
<Suspense
fallback={
  <div
      className="w-full
      items-center
      justify-center flex
      flex-row gap-x-2">
<Loader2
className="animate-spin
text-customTeal
w-8
h-8"/> 
      </div>
}>  <StudentAttendnceBox
  myself
  />
  </Suspense>

 <div
 className="w-full
 items-center
 flex
 justify-center"
 >
   
    <Suspense
    fallback={<div
      className="w-full
      items-center
      justify-center flex
      flex-row gap-x-2">
<Loader2
className="animate-spin
text-customTeal
w-8
h-8"/> 
      </div>}>
    <StudentAttendnceBox
      myself={false}
    />  
    </Suspense>
    
  
  </div>
<div className="w-full">
  <Suspense
  fallback={<div
    className="w-full
    items-center
    justify-center flex
    flex-row gap-x-2">
<Loader2
className="animate-spin
text-customTeal
w-8
h-8"/> 
    </div>}>
  <StudentFine/>
  </Suspense>
</div>
<div className="w-full">
  <Suspense
  fallback={<div
    className="w-full
    items-center
    justify-center flex
    flex-row gap-x-2">
<Loader2
className="animate-spin
text-customTeal
w-8
h-8"/> 
    </div>}>
  <StudentsWarning/>
  </Suspense>
</div>


<div className="w-full">
  <Suspense
  fallback={<div
    className="w-full
    items-center
    justify-center flex
    flex-row gap-x-2">
<Loader2
className="animate-spin
text-customTeal
w-8
h-8"/> 
    </div>}>
  <AcademicWarnings/>
  </Suspense>
</div>

</div>


         </div>
          }

          return <div>Not signed in</div>;
          
          
        }
       
        function wait(time:number){
            return new Promise(resolve=>setTimeout(resolve,time))
          }
        export default HomePage;