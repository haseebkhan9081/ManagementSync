 "use client"
import { Loader2, Users } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { clerkClient } from '@clerk/nextjs'
import { Avatar,AvatarImage } from '@/components/ui/avatar';
import RoleModal from '@/components/modals/RoleModal';
import RoleRequest from './_components/RoleRequest'; 
import { User } from '@prisma/client';
import client from '@/lib/prismadb'; 
import { useAllUsers } from '@/app/hooks/useAllUsers';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
const userMap=new Map();
export default  function Role() {
    const [users,setUsers]=useState<User[]>([])
    const [loading,setloading]=useState(false);
const fetchData=()=>{
    setloading(true)
    axios.get("/api/user/all").then((res)=>{
        setUsers(res.data);
    }   
    ).catch((err)=>{
        console.log("err at pages.tsx roles",err);
    }).finally(()=>{    
        setloading(false);
    }
    )

}
const {ref}=useInView({
    threshold:0.5,
    onChange:(inview)=>{
        if(inview){
            fetchData()
        }
    }
       
   
    ,
    triggerOnce:true,
})
    return (
    <div
    ref={ref}
    className='p-3 mt-2 bg-customDark w-full
     '> <div
     className='flex
     flex-col w-full space-y-2 '>
        {loading&&
        <div
        className='w-full
        flex
        flex-col
        justify-center
        items-center'>
        <Loader2 className='
        animate-spin
        text-customTeal
        '/>
        </div>
}        {users?.map((user)=>(
            <RoleModal
             id={user?.clerkId||""}
             key={user?.id}
             firstName={user?.firstName!}
             lastName={user?.lastName!}
             email={user?.emailAddress||""}
             imageUrl={user?.imageUrl||""}
             teacher={user?.teacher}
             admiN={user?.admin}
             visitor={user?.visitor}
             >
                <div>
        <RoleRequest
        firstName={user?.firstName!}
        lastName={user?.lastName!}
        email={user?.emailAddress||""}
        imageUrl={user?.imageUrl||""}
        />
        </div>
                    </RoleModal>
        ))}
        </div></div>
  )
}
