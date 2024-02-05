import React from 'react'
import Image from 'next/image'
 
export default function layout({
    children}:{
        children:React.ReactNode
    }) {
 
return (
    <div
    className='
    mt-10
    flex
    h-full
     flex-col gap-2 
     items-center
      justify-center'>
        <div
        className='
        gap-2
        flex flex-col
        items-center
        justify-center'>
            
            <h1
            className='text-xl font-bold
            md:text-3xl'>Welcome to ManageSync!</h1>
      <p
      className='text-slate-800 p-3 text-center
       '> Forget the Traditional Paper work, this is
        Your Gateway 
        to Seamless Education Management!</p>
        </div>
        <div>{children}</div>
        
    </div>
)

    }