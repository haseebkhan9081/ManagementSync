"use client";
import ConfirmationModal from '@/components/modals/CardModel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Student } from '@prisma/client';
import axios from 'axios';
import { Loader2, PlusCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
interface StudentGridProps{
    students:Student[]
}

const StudentCard = dynamic(() => import('./StudentCard'), {
  loading: () => <div 
  className="w-full
  items-center
  flex
  justify-center
  h-full"
  ><Loader2
  className="animate-spin
  "/></div>,
  ssr: false, // Disable server-side rendering for this component
});

const StudentGrid:React.FC<StudentGridProps>=({
    students
})=>{
    const [isLoading,setIsLoading]=useState(true);
    const [admissionLoading,setAdmissionLoading]=useState(false);
    const router=useRouter();
    const onClick=async()=>{
        setAdmissionLoading(true);
        await axios.get("/api/student").then((response)=>{
            toast('lets go',{
                icon:'🚀'
            });
            console.log(response.data);
            router.push(`/studentManagement/${response.data.id}`)
        router.refresh();
        
        }).catch((error)=>{
            toast.error('something went wrong!');
        }).finally(()=>{
            setAdmissionLoading(false)
        }) 
        }
//when mounts 
        useEffect(()=>{
setIsLoading(false);
},[])

return <>
 {isLoading?(
    <div
    className='flex
    h-screen
    w-full
    justify-center
    items-center'>
<Loader2
className='animate-spin w-8 h-8'/>
    </div>
 ):(
    <div>
    <div className="flex flex-row border-b-2
            border-slate-100 gap-x-1">
    <Input  className="w-full md:w-[300px]
     pl-9 rounded-md bg-slate-100 focus-visible:ring-slate-200"
          />
          
    <Button
    onClick={ onClick} type="button"  
    className="gap-x-1 bg-green-700">
        {admissionLoading?(<div>
            <Loader2
className='w-6 h-6 animate-spin'/>
           
 </div>):(<div
 className='flex flex-row
 gap-x-1 items-center justify-center'>
    Admission 
    <PlusCircle/>
 </div>)}
       
       </Button>
     </div>
    
    <div className="grid mt-2 grid-cols-2 gap-4">
     {students?.map((student,index)=> (
       <Suspense
       key={student?.id}
       fallback={
        <div 
      className="
      w-full
      items-center
      flex
      justify-center
      h-full"
      ><Loader2
      className="animate-spin
      "/></div>
       }
       >   <ConfirmationModal
        student={student}
         >
            <div>
            <StudentCard student={student}/>
            </div>
            </ConfirmationModal>
            </Suspense>
    
     ))}
     </div>
     </div>
 )}

 </>;
}

export default StudentGrid;