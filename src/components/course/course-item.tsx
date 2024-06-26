import { IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils";
import CourseCardDetails from "./course-detail-item";

interface CourseItemProps {
  CourseName: string;
  CourseDescription: string;
  CourseIcon: any;
  CourseEstimatedTime: number;
  CourseChapter: number;
  CourseTeacher: string;
  ClassName?: string;
}

const CourseItem: React.FC<CourseItemProps> = ({
  CourseName,
  CourseDescription,
  CourseIcon,
  CourseEstimatedTime,
  CourseChapter,
  CourseTeacher,
  ClassName,
}) => {
  return (
    <div className="flex items-center">
      <div
        className={cn(
          "h-14 w-14 rounded-md flex items-center justify-center lg:hidden 2xl:flex",
          ClassName
        )}
      >
        <span className="text-white">{CourseIcon}</span>
      </div>
      <div className="ml-4 space-y-1 w-3/4">
        <p className="text-sm font-medium leading-none">{CourseName}</p>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
          {CourseDescription}
        </p>

        <CourseCardDetails
          CourseEstimatedTime={CourseEstimatedTime}
          CourseChapter={CourseChapter}
          CourseTeacher={CourseTeacher}
        />
      </div>
      <div className="ml-auto mr-4 font-medium cursor-pointer rounded-full hover:bg-gray-100">
        <IoIosArrowForward />
      </div>
    </div>
  );
};

export default CourseItem;
