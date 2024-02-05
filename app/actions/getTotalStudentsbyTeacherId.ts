import client from "@/lib/prismadb";

export const getTotalStudentsbyTeacherId = async (id: number) => {
  try {
    const totalStudents = await client.student.count({
      where: {
        classes: {
          some: {
            teacherid: id,  
          },
        },
      },
    });
    
    return totalStudents || 0;
  } catch (error) {
    console.error('Error fetching total students:', error);
     
    return 0; // Return a default value in case of an error
  }
};
