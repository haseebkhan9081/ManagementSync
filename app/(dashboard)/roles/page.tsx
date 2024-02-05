import { Users } from 'lucide-react'
import React, { use, useEffect } from 'react'
import { clerkClient } from '@clerk/nextjs'
import { Avatar,AvatarImage } from '@/components/ui/avatar';
import RoleModal from '@/components/modals/RoleModal';
import RoleRequest from './_components/RoleRequest';
import axios from 'axios';
import { User } from '@prisma/client';
import client from '@/lib/prismadb';
const userMap=new Map();
export default async function Role() {
    const users=await clerkClient.users.getUserList({limit:400});
    console.log("here is the total users",users?.length);
    for(const user of users){
        const dbuser:User|null=await client.user.findUnique({
            where:{
                clerkId:user?.id,
            },
            
        });
        if(dbuser){
        userMap.set(user.id,{admin:dbuser.admin,
            teacher:dbuser.teacher,
            visitor:dbuser.visitor
        });
        }else{
            userMap.set(user.id,{  
                admin: false,
                teacher: false,
                visitor: false,
            })
        }
        }
        
        console.log("the populated Map",userMap);
        
  
   

    return (
    <div
    className='p-3 mt-2 bg-slate-50 w-full
     '> <div
     className='flex
     flex-col w-full bg-slate-100 space-y-2 '>
        {users?.map((user)=>(
            <RoleModal
             id={user?.id}
             key={user?.id}
             firstName={user?.firstName!}
             lastName={user?.lastName!}
             email={user?.emailAddresses[0].emailAddress}
             imageUrl={user?.imageUrl}
             teacher={userMap.get(user?.id).teacher}
             admin={userMap.get(user?.id).admin}
             visitor={userMap.get(user?.id).visitor}
             >
        <RoleRequest
        firstName={user?.firstName!}
        lastName={user?.lastName!}
        email={user?.emailAddresses[0].emailAddress}
        imageUrl={user?.imageUrl}
        />
                    </RoleModal>
        ))}
        </div></div>
  )
}
