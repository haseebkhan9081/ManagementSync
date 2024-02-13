import {create} from 'zustand';
import { Student } from '../(dashboard)/studentManagement/_components/columns';
import { Class, Teacher } from '@prisma/client';
import axios from 'axios';
import { User } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs';

type AllsectionsState = {
 users:User[],
 fetchUsers:()=>void;
};

export const useAllUsers = create<AllsectionsState>((set) => ({
  users:[],
  fetchUsers:async()=>{
    const t=  await clerkClient.users.getUserList({
        orderBy: '-created_at',
        limit: 10,
      });
      set({users:t})
      console.log(t.length);
  }
}));
