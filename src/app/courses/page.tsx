"use client";

import CoursesList from "@/components/course/course-List";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Course } from "@/types/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const CoursesPage = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const returnRowsParam = session?.AccessToken
          ? `?returnRows=${100}`
          : "";
        const response = await fetch(
          `http://localhost:5033/Course/All${returnRowsParam}`,
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.AccessToken}`,
            },
          }
        );

        const data = await response.json();

        setCourses(data);
      } catch (error) {
        setError(
          `Error fetching data. Please try again later. Error description: ${error}`
        );
      }
    };

    if (session?.AccessToken) {
      fetchCourses();
    }
  }, [session?.AccessToken]);

  const filteredCourses = courses.filter((course) =>
    course.CourseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    console.log(error);
  }

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
        <Link href="/teacher/courses/create">
          <Button>New Course</Button>
        </Link>
      </div>

      <div className="h-[95%]">
        <CoursesList courses={filteredCourses} />
      </div>
    </div>
  );
};

export default CoursesPage;
