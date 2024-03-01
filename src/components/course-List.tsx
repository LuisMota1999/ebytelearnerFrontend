import CourseCard from "@/components/ui/course-card";
import NoResults from "@/components/ui/no-results";
import { Item } from "@radix-ui/react-dropdown-menu";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Course {
  Id: string;
  CourseName: string;
  CourseDescription: string;
  CoursePrice: number;
}

export default function CoursesList() {
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
          cache: "force-cache",
        });

        const data = await response.json();

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
    return (
      <div>
        <NoResults />
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {courses.length === 0 && <NoResults />}
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
  );
}
