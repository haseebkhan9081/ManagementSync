"use client";
import { usePathname } from "next/navigation";
import { Home,BookOpenText, UserRoundCog,PencilRuler
    ,Megaphone,GraduationCap,CircleDashed, Shapes} from "lucide-react";
import Icon from "./Icon";
import { cn } from "@/lib/utils";
import Link from "next/link";
 
const iconMap= new Map([
    ['/',{icon:Home,label:'Home'}],
    ['studentManagement',{icon:BookOpenText,label:'Student Management'}],
    ['teacherManagement',{icon:UserRoundCog,label:'Teacher Management'}],
    ['classManagement',{icon:PencilRuler,label:'Class Management'}],
    ['attendance',{icon:Megaphone,label:'Attendance'}],
    ['examsGrades',{icon:GraduationCap,label:'Exams and Grades'}],
    ['reports',{icon:CircleDashed,label:'Reports'}],
    ['roles',{icon:Shapes,label:'Assign Roles'}],
  
])

const Navigation =({setOpen}:{setOpen:( value:boolean)=>void})=>{
const path=usePathname(); 
let currentPath = path.length>1 ? path.substring(1) : path;
console.log(currentPath);
console.log()
    return <div
    className="flex flex-col space-y-2 mt-2"
    > 
    {Array.from(iconMap).map(([route,{icon,label}])=>(
        <Link
        key={route}
href={`/${route}`}>
<div
 onClick={()=>setOpen(false)}
className={
    cn(`flex flex-row
    text-customLight
    justify-between items-center p-3
text-lg`,
     currentPath.includes(route)
    && 'border-r-2 border-customLight',
    currentPath===route  && 'border-r-2 border-customLight'

    ) }>
 
<p>{label}</p>
 
<Icon 
icon={icon} />
 
</div>
</Link>    )
    )}
    </div>
}
export default Navigation;