"use client";

import CoursesList from "@/components/course/course-List";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <div className="p-4 h-full">
      <Link href="/create">
        <Button >New Course</Button>
      </Link>
      <CoursesList />
    </div>
    
  );
};

export default CoursesPage;
