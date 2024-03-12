import CourseCard from "@/components/course/course-card";
import NoResults from "@/components/ui/no-results";
import { Suspense} from "react";
import Loading from "@/components/ui/loading";
import { Course } from "@/types/types";

interface Props {
  courses: Course[]; // Define the type of the courses prop
}

export default function CoursesList({ courses }: Props) { // Destructure courses from props

  return (
    <Suspense fallback={<Loading interval={70} />}>
      {courses.length === 0 && <NoResults />}
      <div className="space-y-4">
        
        <div className="grid gap-4 grid-cols-6">
          {courses.map((item, index) => (
            <div
              className="col-span-6  md:col-span-3 lg:col-span-2"
              key={index}
            >
              <CourseCard
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
