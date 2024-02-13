"use client"
import { ArrowUpDown, MoreHorizontal, User, UserCog, UserMinus, UserPlus } from "lucide-react"

import { Preview } from "@/components/preview"
import { cn } from "@/lib/utils"
import { Attendance, Class, Grade } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format, parse } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import Image from "next/image"
import StudentModal from "./StudentProfileModal"
import { useState } from "react"
import { useStudentProfileState } from "@/app/hooks/ProfileModalState"
import { useStudentEditState } from "@/app/hooks/useStudentEditState"
import axios from "axios"
import { toast } from "sonner"
import { useAllStudentState } from "@/app/hooks/AllStudentState"
import { useMyInfo } from "@/app/hooks/usemyInfo"

export type Student ={
  id  :number,
  Name  :  string,
  age  :      string
  imageUrl :  string
  fatherName: string
  Contact    :string
  Address    :string
  ReliveCounter :number
  ReliveMonth :number
  DeActive :boolean
  classes   :  (Class&{
    attendence:Attendance[],
    Grade:(Grade&{
      class:Class
    })[]
  })[]
  attendances :Attendance[]
  grades    :  Grade[]
}


export const columns: ColumnDef<Student>[] = [
  {
    id: "actions",
    cell:function Cell({row,}) {
      const {admin}=useMyInfo()
      const attendance = row.original
      const router=useRouter();
      const {setEdit,setEditProfile}=useStudentEditState();
      const {setIsOpen,setProfile}=useStudentProfileState();
      const {fetchStudentById}=useAllStudentState();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            className="flex-row
            gap-x-2
            w-full
            "
            onClick={ ()=>{setIsOpen(true) 
            setProfile(row.original);
            }
            }  >
          

            View Profile<User className="text-customTeal"/>
          </DropdownMenuItem>
            <DropdownMenuItem
              disabled={!admin}
            className="flex-row
            gap-x-2
            w-full"
              onClick={ ()=>{
setEdit(true);
setEditProfile(row.original);


              }
              }  >
              Edit<UserCog className="text-customTeal"/>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={!admin}
            className="flex-row
            gap-x-2
            w-full"
            onClick={ ()=>{

           axios.patch(`/api/student/${row.original.id}`,{
            DeActive:!row.original.DeActive
           }).then((res)=>{
fetchStudentById(row.original.id);
            toast.success("updated")
           }).catch((err)=>{
            console.log('[err at studentManagement coumns]',err)
           })

            }
            }  >

              {row.original.DeActive?(<>Activate<UserPlus
            className="text-customTeal"/></>):(<>DeActivate<UserMinus
              className="text-customTeal"/></>)}
            
          </DropdownMenuItem>
         
            
             </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
  {
    accessorKey:"Image",
    header:"Image",
    accessorFn:(row)=>{
      return row.imageUrl
    },
    cell:({row})=>{
      return <div
      className={cn(
        `w-[70px]
        aspect-square
        relative `,
        
        )}>
       <Image
       className="rounded-full  object-cover"
       alt={row.original.imageUrl}
       src={row.original.imageUrl||"/images/placeholder.jpg"}
       fill
       
       />
       </div>
    }
  },
  
  
  {
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn:(row)=>{
      return row.Name
    }
    
  },
  {accessorKey:"fatherName",
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Father Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    )
  },

  },
  {
    accessorKey:"roll",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Roll#
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn:(row)=>{
      return row.id
    },
    enableColumnFilter:true,
    enableGlobalFilter:true,
  
  }
   ,
   
    
  {
    accessorKey:'age',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Age
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    
  },{
    accessorKey:"Contact",
    header:"Contact"
  },
  {
    accessorKey:"Address",
    header:"Address"
  }
]
