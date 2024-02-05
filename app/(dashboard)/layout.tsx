"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { UserButton, useUser } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import Navigation from "./_components/Navigation";
import { useState } from "react";
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const {user}=useUser();
    const [open,setOpen]=useState(false);
  return (
  
    
    <html lang="en"
    className="bg-customDark">
        <Sheet

         open={open} onOpenChange={setOpen}>
  <div

  className="flex 
  bg-customDark justify-between flex-row w-full py-6   border-customTeal">
   <div className="px-3 text-slate-800"><SheetTrigger><Menu
   className="
   text-customLight 
   w-8
   h-8"/></SheetTrigger></div> 
   
   <div className="px-3"></div> 
    </div>
    
  <SheetContent className="" side={"left"} >
    <SheetHeader>
      <SheetTitle className=" p-3 font-normal
      border-b-2 border-customTeal
      flex
      flex-col
      items-center
      justify-center
      w-full
      h-full
      ">
        <UserButton
         
        /></SheetTitle>
      <SheetDescription>
         <Navigation
         setOpen={setOpen}
         />
      </SheetDescription>
    </SheetHeader>
    
  </SheetContent>
</Sheet>

      <main
      className="bg-slate-50">{children}</main> 
    </html>
  
  )
}
