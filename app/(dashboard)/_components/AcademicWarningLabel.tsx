import React from 'react'
interface AcademicWarningLabelprops{
    Sname:string,
    Cname:string,
    averge:number,
}
export const AcademicWarningLabel:React.FC<AcademicWarningLabelprops> = ({
    Cname,
    Sname,
    averge
}) => {
  return (
    <div
    className='w-full
    ring-1
    ring-customTeal
    rounded-lg
    p-3
    flex
    flex-row
    text-customLight
   justify-between
    items-center
    '>
        <div>{Sname}</div>
        <div
        className='text-red-600'>{averge}%</div>
        <div>{Cname}</div>
    </div>
  )
}
