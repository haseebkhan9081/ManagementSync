"use client"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Preview } from "@/components/preview"
import { cn } from "@/lib/utils"
import { Class, Student } from "@prisma/client"
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
 
export type Attendance = {
  id: number,
date:   string,
reason :String |null
present: Boolean
absent: Boolean
leave: Boolean
topic: String       
student:   Student 
studentId: number
class :    Class 
classId  : number
fine  :number
}


export const columns: ColumnDef<Attendance>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const attendance = row.original
      const router=useRouter();
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
            
              onClick={()=>{

const parsedDate = parse(attendance.date, 'dd.MM.yyyy', new Date());
const formattedDate = format(parsedDate, 'yyyy-MM-dd');
router.push(`/attendance/${attendance.classId}/${encodeURIComponent(formattedDate)}`)
              }  
              }  >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
             </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
  ,
  {
    accessorKey:"roll",
    header:"Roll#",
    accessorFn:(row)=>{
      return row.student.id
    },
    enableColumnFilter:true,
    enableGlobalFilter:true,
  
  }
  ,
  {
    accessorKey: "Name",
    header: "Name",
    accessorFn:(row)=>{
      return row.student.Name
    }
    
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=>{
      const dateValue:string = row.getValue('date');

       
       
        return <div>{dateValue}</div>;
      
  }
  },
  {
    accessorKey: "Status",
    accessorFn:(row)=>{
      return row.present
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=>{
      const isAbsent = row.original.absent;
      const isPresent = row.original.present;
      const isLeave = row.original.leave;
  
      const attendanceStatus =
        isAbsent ? 'Absent' : isPresent ? 'Present' : isLeave ? 'Leave' : 'Attendance not marked';
  
      return <div
      className={cn(
        isAbsent&&'text-red-600',
        isPresent&&'text-green-700',
        isLeave&&'text-sky-400 '

      )}
      
      >{attendanceStatus}</div>;
    
    }
  }, 
  {
    accessorKey:'reason',
    header:'Reason'
    
  },
  {
    accessorKey: "topic",
    header: "Topic",
    cell:({row})=>{

      return <div><Preview
      value={row.getValue("topic")}/></div>
    }
  }, 
  {
    accessorKey:'fine',
    header:'Fine'
    
  },
]
