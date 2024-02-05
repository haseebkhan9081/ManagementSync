import { cn } from '@/lib/utils';
import { Dialog, Transition } from '@headlessui/react' 
import Image from 'next/image';
import { Fragment, Suspense, lazy } from 'react'
import { Student } from './columns';
import ProfileImage from './ProfileImage';
import { ProfileInfo } from './ProfileInfo'; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';  
import { Button } from '@/components/ui/button';
const WarningTab=lazy(()=>import("./WarningTab").then((module)=>({default:module.WarningTab})))
const GradesTab=lazy(()=>import("./GradesTab").then((module)=>({default:module.GradesTab})))
const AttendanceTab=lazy(()=>import("./AttendanceTab").then((module)=>({default:module.AttendanceTab})))

interface StudentModalprops{
  isOpen:boolean;
  setIsOpen:(v:boolean)=>void;
  profile:Student|null
}


const StudentModal:React.FC<StudentModalprops>=({  
isOpen,
setIsOpen,
profile
})=>{
  

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
       

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative w-full p-0 z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed p-0 inset-0 w-full overflow-y-auto">
            <div className="flex w-full min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-customDark p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-customTeal"
                  >
                    Student Profile
                  </Dialog.Title>
                  <div className="mt-2
                  flex
                  m-0
                  p-0
                  flex-col
                  space-y-4
                  w-full">
                     <div
                     className='
                     flex
                     
                     flex-row
                    justify-between
                    gap-x-2
                    items-center
                     w-full'>

     <ProfileImage
     Name={profile?.Name||""}
     imageUrl={profile?.imageUrl||""}
     /> 
     <ProfileInfo
     profile={profile!}
     />
                 
                     </div>
   <div
   className='flex
   flex-col
   w-full
   '>                  
                     <Tabs defaultValue="account" className=" flex flex-col w-full">
  <TabsList
  className='bg-customTeal
  flex
  flex-row
  w-full
  justify-center
  gap-x-6
  items-center
  '>
    <TabsTrigger  value="Attendance">Attendance</TabsTrigger>
    <TabsTrigger value="Grades">Grades</TabsTrigger>
      
 
  </TabsList>
  <TabsContent value="Attendance">
    <Suspense
    fallback={<div>loading...</div>}>
    <AttendanceTab
    profile={profile}
    />
    </Suspense>
  </TabsContent>


  <TabsContent value="Grades">
    <Suspense
    fallback={<div>loading...</div>}>
    <GradesTab
    profile={profile}
    />
    </Suspense></TabsContent>
    
   

</Tabs>
</div>
                  


                  </div>

                  <div className="mt-4">
                    <Button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-customTeal px-4 py-2 text-sm font-medium text-customDark hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default StudentModal;