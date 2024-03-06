import { IoBookSharp, IoCloud } from "react-icons/io5";
import { RiPagesFill } from "react-icons/ri";
import RecentCourseCard from "@/components/course/course-item";

interface RecentCourse {
  CourseName: string;
  CourseIcon: any;
  CourseDescription: string;
  CourseTeacher: string;
  CourseEstimatedTime: number;
  CourseChapter: number;
  ClassName?: string;
}

const recentCoursesData: RecentCourse[] = [
  {
    CourseName: "Web Development NextJS 14",
    CourseIcon: <RiPagesFill size={20} />,
    CourseDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    CourseTeacher: "Joe Marshall",
    CourseEstimatedTime: 16,
    CourseChapter: 8,
    ClassName: "bg-[#00A76F]",
  },
  {
    CourseName: "Azure & Cloud Computing",
    CourseIcon: <IoCloud size={20} />,
    CourseDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    CourseTeacher: "Joe Marshall",
    CourseEstimatedTime: 36,
    CourseChapter: 23,
    ClassName: "bg-blue-300",
  },
  {
    CourseName: "English Lectures",
    CourseIcon: <IoBookSharp size={20} />,
    CourseDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    CourseTeacher: "Joe Marshall",
    CourseEstimatedTime: 42,
    CourseChapter: 28,
    ClassName: "bg-orange-400",
  },
];

export function RecentCourses() {
  return (
    <div className="space-y-8 max-h-[20rem] overflow-y-auto">
      {recentCoursesData.map((item, index) => (
        <RecentCourseCard
          key={index}
          CourseName={item.CourseName}
          CourseIcon={item.CourseIcon}
          CourseDescription={item.CourseDescription}
          CourseTeacher={item.CourseTeacher}
          CourseChapter={item.CourseChapter}
          CourseEstimatedTime={item.CourseChapter * 1.5}
          ClassName={item.ClassName}
        />
      ))}
    </div>
  );
}
