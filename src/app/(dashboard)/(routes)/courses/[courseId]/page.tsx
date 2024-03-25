"use client";
import { Course } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const { data: session } = useSession();
  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_NEXT_URL}/Course/08dc4a03-b5f0-4e0f-844f-1f2409de3904`,
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.AccessToken}`,
            },
          }
        );

        if (res.ok) {
          const courseData = await res.json();
          setCourse(courseData);
        } else {
          console.error("Error during fetch:", res.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchCourse();
  }, [session]);

  return (
    <div>
      {/* Render course data */}
      {course && (
        <div>
          <h1>{course.CourseName}</h1>
          <p>{course.CourseDescription}</p>
          <p>{course.CourseCategory.CategoryName}</p>
          <p>{course.IsPublished}</p>
          <p>{course.CoursePrice}</p>
          <p>{course.CourseTeacher.Username}</p>
          {/* Render other course data as needed */}
        </div>
      )}
    </div>
  );
};

export default CourseIdPage;
