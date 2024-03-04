import CourseCard from "@/components/course/course-card";
import NoResults from "@/components/ui/no-results";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import Loading from "../ui/loading";

interface Course {
  Id: string;
  CourseName: string;
  CourseDescription: string;
  CoursePrice: number;
}

export default function CoursesList() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

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
        setError(`Error fetching data. Please try again later. Error description: ${error}`, );
      }
    };

    if (session?.AccessToken) {
      fetchCourses();
    }
  }, [session?.AccessToken]);

  if (error) {
    console.log(error);
  }
  return (
    <Suspense fallback={<Loading interval={70} />}>
      {courses.length === 0 && <NoResults />}
      <div className="space-y-4">      
        <div className="grid gap-4 grid-cols-6">
          {courses.map((item, index) => (
            <div className="col-span-6  md:col-span-3 lg:col-span-2">
              <CourseCard
                key={index}
                CourseName={item.CourseName}
                CoursePrice={item.CoursePrice}
                CourseDescription={item.CourseDescription}
                CourseImage="https://images.unsplash.com/1/work-station-straight-on-view.jpg"
              />
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
}
