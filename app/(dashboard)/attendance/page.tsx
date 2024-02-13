import getClassesByTeacherId from "@/app/actions/getClassesByTeacherId";
import AttendanceList from "./_components/AttendanceList"; 
 

const Attendance=async()=>{
   
    

   
    return <div
    className="p-3
    bg-customDark">
<AttendanceList
 
/>
       
    </div>
}

export default Attendance;