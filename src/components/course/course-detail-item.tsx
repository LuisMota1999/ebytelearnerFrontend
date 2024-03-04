import { TiTime } from "react-icons/ti";
import { GiBlackBook } from "react-icons/gi";
import { FaChalkboardTeacher } from "react-icons/fa";
interface CourseDetailProps {
  CourseEstimatedTime: number;
  CourseChapter: number;
  CourseTeacher: string;
}

const CourseCardDetails: React.FC<CourseDetailProps> = ({
    CourseEstimatedTime,
    CourseChapter,
    CourseTeacher
}) => {
  return (
    <div className="w-full flex flex-row justify-between ">
      
      <span className="text-xs md:text-sm text-muted-foreground flex flex-row">
        <GiBlackBook size={17} className="mt-[0.1rem]" />
        &nbsp;{CourseChapter} Chapters
      </span>
      <span className="text-xs md:text-sm text-muted-foreground flex flex-row">
        <TiTime size={17} className="mt-[0.1rem]" />
        &nbsp;{CourseEstimatedTime} Hours
      </span>
      <span className="text-xs md:text-sm text-muted-foreground flex flex-row">
        <FaChalkboardTeacher size={17} className="mt-[0.1rem]" />
        &nbsp;{CourseTeacher}
      </span>
    </div>
  );
};

export default CourseCardDetails;
