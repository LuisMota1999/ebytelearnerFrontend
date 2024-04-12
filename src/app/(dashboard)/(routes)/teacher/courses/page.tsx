'use client';
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { CourseForm } from "./_components/course-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoursesList from "@/components/course/course-List";
import { GridIcon, RowsIcon } from "lucide-react";
import { useState, useEffect } from 'react'; // If you're using React Hooks
import { useSession } from "next-auth/react";

async function fetchCoursesData(session: any) {
  try {
    const returnRowsParam = session?.AccessToken ? `?returnRows=${100}` : "";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEXT_URL}/Course/All${returnRowsParam}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
      }
    );
    if (response.ok) {
      const responseBody = await response.json();

      return responseBody;
    } else {
      console.log(session?.AccessToken);
      
      throw new Error("Failed to fetch course data");
    }
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
}

const CoursesPage = () => {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await fetchCoursesData(session);
        setCourses(fetchedCourses); // Update courses state
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="p-6">
      <CourseForm />

      <Tabs defaultValue="table" className="w-full">
        <TabsList>
          <TabsTrigger value="grid" className="flex gap-2 items-center">
            <GridIcon />
            Grid
          </TabsTrigger>
          <TabsTrigger value="table" className="flex gap-2 items-center">
            <RowsIcon /> Table
          </TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <CoursesList courses={courses!} />
        </TabsContent>
        <TabsContent value="table">
          <DataTable columns={columns} data={courses!} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursesPage;
