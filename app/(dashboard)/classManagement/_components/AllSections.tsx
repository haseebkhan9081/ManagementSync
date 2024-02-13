import { useAllsectionsState } from '@/app/hooks/useAllSectionsState'
import axios from 'axios'
import { Loader2 } from 'lucide-react' 
import { Suspense, lazy } from 'react'

import { useInView } from 'react-intersection-observer' 
import { FadeIn } from '../../_components/FadeIn'
import { Transition } from '@headlessui/react'
const Section=lazy(()=>import("./Section").then((module)=>({default:module?.Section})))
export const AllSections = () => {
    const {sections,fetchSections}=useAllsectionsState();
    const {ref}=useInView({
        threshold:0.1,
        onChange:(inview)=>{
            if(inview){
                fetchSections()
            }
        }
    })
     
  return (
    <div
    ref={ref}
    > 
{!sections.length&&<div>
    <Loader2
    className='text-customTeal
    animate-spin
    flex
    justify-between
    items-center
    w-full
    '/>
    </div>}
    <div
    className='flex
    flex-col
    space-y-4'>
    <Transition.Root
    as='div'
    className={"flex flex-col space-y-4 w-full"}
    show={sections?.length?true:false}>
{sections?.map((se,index)=>(
    <FadeIn delay=''>    <Suspense
    fallback={<div>loading...</div>}>
    <Section
    section={se}
    randomNumber={Math.floor(Math.random() * (10))
    }
    Students={se?.students}
    name={se?.name}
    numberOfStudents={se?.students.length}
    subject={se?.subject}
    teacherName={se?.teachers?.firstName+" "+se?.teachers?.firstName}
    key={index}
    />
    </Suspense>
    </FadeIn>

))}
</Transition.Root>
</div>
    </div>
  )
}
