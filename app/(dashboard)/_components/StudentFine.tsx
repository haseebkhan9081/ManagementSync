import { Student,Class } from '@prisma/client';
import axios from 'axios' 
import { ChevronDown, ChevronUp, DollarSign, Loader2 } from 'lucide-react'
import { Suspense, lazy, useState } from 'react';
import { useInView } from 'react-intersection-observer'
 
const FineLabel=lazy(()=>import("./FineLabel")
.then((module)=>({default:module.FineLabel})))
import { Transition } from '@headlessui/react';
import { FadeIn } from './FadeIn';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useRouter } from 'next/navigation';
interface ProfileItem {
  studentId: number;
  totalFine: number;
  student: (Student&{
    classes: Class[];
  });
}
interface FineData {
  DueAll: number;
  MyDue: number;
  collectedAll: number;
  MyCollect: number;
  profile:  ProfileItem[] // Use the ProfileItem interface for the profile array
}
export const StudentFine = () => {
  const [fineData, setFineData] = useState<FineData>({
    DueAll: 0,
    MyDue: 0,
    collectedAll: 0,
    MyCollect: 0,
    profile:[]
  }); 

  const router=useRouter()
  const handleRefresh=()=>{
   fetchData()
    
    

  }
//function to fetch data 
const fetchData=()=>{
  setIsFetched(false);
  axios.get("/api/student/fine").then((response)=>{
    const { DueAll, MyDue, collectedAll, MyCollect,profile } = response.data;
    setFineData({
      DueAll: DueAll || 0,
      MyDue: MyDue || 0,
      collectedAll: collectedAll || 0,
      MyCollect: MyCollect || 0,
      profile:profile
    }); 
    setIsFetched(true);
  }).catch((err)=>{
    console.log("[ ERROR management_sync/app/(dashboard)/_components/StudentFine.tsx]",err)
  })
}  
const [ref,inView]=useInView({
  triggerOnce:true,
  threshold:0.1,
  onChange:(inView)=>{
    if(inView){
fetchData();
    }
  }
})
const [tap,setTap]=useState(false);
const [isfetched,setIsFetched]=useState(true);
  return (
    <div
 
    className='w-full
    relative'>
      {!isfetched&&<div
  
  className='
  absolute
rounded-lg
  w-full
  h-full
  bg-customLight/25
  justify-center
  items-center
  flex
  flex-col
  '>
<Loader2
className='
z-50
animate-spin
text-customTeal
w-8
h-8'/>
  </div>}
    <div
    ref={ref}
    className='p-6
    bg-customGray
    rounded-lg
    flex
    flex-col
    justify-center
    items-center
    z-50'>
        <div
        className='flex
        flex-row
        justify-between
        items-center
        w-full'>
<div
className='flex
flex-col
space-y-2
'>
<div
className='flex
flex-col
text-customTeal
text-xl'>
 Total Fine Collected this Month 
<div
className='text-customLight text-lg'>From your class <p
className='text-3xl text-customTeal'>{fineData.MyCollect}rs</p></div>

<div
className='text-customLight text-lg'>From whole library <p
className='text-3xl text-customTeal'>{fineData.MyCollect}rs</p></div>

</div>
<div
className='flex
flex-col
text-xl
text-customTeal
'>
 Fine due to Collect  
 
 <div
className='text-customLight text-lg'>From your class <p
className='text-3xl text-customTeal'>{fineData.MyDue}rs</p></div>

<div
className='text-customLight text-xl'>From whole Library <p
className='text-3xl text-customTeal'>{fineData.DueAll}rs</p></div>

</div>
</div>
 
</div>
   <div
   className='p-3'>
    {!tap?(
      <ChevronDown
      onClick={()=>setTap(true)}
      />
    ):( 
<ChevronUp
onClick={()=>setTap(false)}/>
    )}
    </div> 
    <div
    className='flex
    
    w-full
    flex-col
    space-y-2
    items-center
    justify-center'>
    {tap&& <p
     className='text-lg '> Fine Due</p>
    }<Transition.Root
      show={tap}
      as={'div'}
      className={"space-y-2"}>
      
{tap&&fineData?.profile?.map((profile)=>(
  <FadeIn delay='delay-[500ms]'>
  <Suspense
  fallback={

    <SkeletonTheme
    baseColor="#222831" highlightColor="#393E46">
<Skeleton
className='rounded-lg  w-full h-full'/>
    </SkeletonTheme>
  }>
  <FineLabel
  fetchData={fetchData}
  roll={profile?.student?.id}
  name={profile?.student?.Name}
  className={profile?.student?.classes.map((classItem) => classItem.name).join(',')}
  fine={profile?.totalFine!}
  /></Suspense>
  </FadeIn>
))}
  
  </Transition.Root>
    </div>
    </div>
  </div>)
}
