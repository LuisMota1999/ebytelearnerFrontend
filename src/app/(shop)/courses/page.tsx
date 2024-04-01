"use client";

import CoursesList from "@/components/course/course-List";
import { Course } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

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
      console.log(responseBody);
      return responseBody;
    } else {
      throw new Error("Failed to fetch course data");
    }
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
}

const CoursesPage = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseData] = await Promise.all([fetchCoursesData(session)]);
        setCourses(courseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const filteredCourses = courses.filter((course) =>
    course.CourseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 h-full">
      <div className="flex flex-row justify-between mb-2">
        <div className="bg-white w-64 p-2 flex items-center mb-3 border-b border-t border-l border-r border-zinc-200 rounded-full">
          <FaSearch className="text-gray-400 mr-2"></FaSearch>
          <input
            className="bg-white outline-none text-sm flex-1"
            type="text"
            name="search"
            value={searchQuery}
            placeholder="Search for a course..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="h-[95%]">
        <CoursesList courses={filteredCourses} />
      </div>
    </div>
  );
};

export default CoursesPage;
