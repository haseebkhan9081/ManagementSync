import React from 'react'
import { Student } from './columns'

interface ProfileInfoprops{
    profile:Student;
}
export const ProfileInfo:React.FC<ProfileInfoprops> = ({
    profile
}) => {
  return (
    <div
    className='text-customLight
    flex
    flex-col
    text-left'
    >
        <p>Name: {profile?.Name}</p>
        <p>Father: {profile?.fatherName}</p>
        <p>Age: {profile?.age}</p>
        <p>Contact: {profile?.Contact}</p>
        <p>Address: {profile?.Address}</p>
        
        
        
         </div>
  )
}
