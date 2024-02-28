"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Course {
  Id: string;
  CourseName: string;
  CourseDescription: string;
  CoursePrice: number;
  Modules: Module[];
}

interface Module {
  Id: string;
  ModuleName: string;
}

export default function HomePage() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5033/Course/All", {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.AccessToken}`,
          },
        });

        const data = await response.json();
        console.log("response", data);
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    if (session?.AccessToken) {
      fetchCourses();
    }
  }, [session?.AccessToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="grid gap-4 grid-cols-6">
        <div className="col-span-6 sm:col-span-4">
          <Card className="bg-[#d7f4e7] flex flex-col items-center text-center sm:text-left md:flex-row md:items-start ">
            <div className="md:w-1/2">
              {/* Content for the larger column */}
              <CardHeader>
                <CardTitle>
                  Welcome back 👋 <p>{session?.User.Username}</p>
                </CardTitle>
                <p className="text-sm text-gray-500 pt-3 pb-6">
                  If you are going to use a passage of Lorem Ipsum, you need to
                  be sure there isn't anything.
                </p>
                <Button variant="green" size="md">
                  <b>Go Now</b>
                </Button>
              </CardHeader>
            </div>
            <div className="md:w-1/2 flex justify-center items-center md:pt-6 ">
              {/* Content for the larger column */}
              <CardContent className="flex justify-center">
                <Image
                  height={250}
                  width={250}
                  alt="teacher"
                  src="/teacherDashboard.svg"
                  className="self-center"
                />
              </CardContent>
            </div>
          </Card>
        </div>
        <div className="col-span-1">
          {/* Content for the smaller column */}
          {/* Add your content here */}
        </div>
      </div>

      <div className="pt-4 grid gap-4 md:grid-cols-6 lg:grid-cols-6">
        {courses.map((course, index) => (
          <div className="col-span-6 sm:col-span-2" key={index}>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {course.CourseName}
                </CardTitle>
                {course.CoursePrice}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-bold">
                  {course.CourseDescription}
                </span>
                <ul>
                  {course.Modules.map((module, moduleIndex) => (
                    <li key={moduleIndex}>{module.ModuleName}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
