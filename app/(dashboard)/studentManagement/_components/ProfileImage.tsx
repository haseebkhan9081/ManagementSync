import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
interface ProfileImageprops{
    Name:string|null,
    imageUrl:string|null

}
  const ProfileImage:React.FC<ProfileImageprops> = ({
    Name,imageUrl
  }) => {
  return (
    <div>    <div
    className={cn(
      `w-[140px]
      aspect-square
      relative `,
      
      )}>
     <Image
     className=" rounded-lg  object-cover"
     alt={Name||""}
     src={imageUrl||"/images/placeholder.jpg"}
     fill
     />
     </div></div>
  )
}

export default ProfileImage;