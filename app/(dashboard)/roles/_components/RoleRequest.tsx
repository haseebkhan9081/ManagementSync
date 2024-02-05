import { Avatar, AvatarImage } from '@/components/ui/avatar';
import React from 'react'
interface RoleRequestProps{
   firstName:string;
   lastName:string;
   email:string;
   imageUrl:string;


    

}
 const RoleRequest:React.FC<RoleRequestProps>=({
    email,
    firstName,
    lastName,
    imageUrl
 })=> {
  return (
    <div className='flex 
    flex-row justify-between 
    gap-x-1
    ring-2 rounded-md
   
   hover:ring-sky-700
   hover:ring-2
    ring-slate-900
    shadow-lg
    p-3
    items-center
    '>
        <Avatar>
            <AvatarImage src={imageUrl||"/images/placeholder.jpg"}/>
        </Avatar>
        <p>
            { firstName} { lastName}</p><p> 
            {email}</p></div> 

  )
}
export default RoleRequest;