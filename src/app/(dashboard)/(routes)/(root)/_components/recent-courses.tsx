import { IoBookSharp, IoCloud } from "react-icons/io5";
import { RiPagesFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { GiBlackBook } from "react-icons/gi";
import { TiTime } from "react-icons/ti";
import { FaChalkboardTeacher } from "react-icons/fa";

export function RecentCourses() {
  return (
    <div className="space-y-8 max-h-[14rem] overflow-y-auto">
      <div className="flex items-center">
        <div className="h-12 w-12 bg-orange-400 rounded-md flex items-center justify-center">
          <span className="text-white">
            <RiPagesFill size={20} />
          </span>
        </div>
        <div className="ml-4 space-y-1 w-3/4">
          <p className="text-sm font-medium leading-none">
            Web Development NextJS 14
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="w-full flex flex-row justify-between ">
            {" "}
            <span className="text-xs md:text-sm text-muted-foreground flex flex-row">
              <GiBlackBook size={17} className="mt-[0.1rem]" />
              &nbsp;27 Chapters
            </span>
            <span className="text-xs md:text-sm text-muted-foreground flex flex-row">
              <TiTime size={17} className="mt-[0.1rem]" />
              &nbsp;36 Hours
            </span>
            <span className="text-xs md:text-sm text-muted-foreground flex flex-row">
              <FaChalkboardTeacher size={17} className="mt-[0.1rem]" />
              &nbsp;Joe Marshall
            </span>
          </div>
        </div>
        <div className="ml-auto mr-4 font-medium ">
          <IoIosArrowForward />
        </div>
      </div>
      <div className="flex items-center">
        <div className="h-12 w-12 bg-blue-300 rounded-md flex items-center justify-center">
          <span className="text-white">
            <IoCloud size={20} />
          </span>
        </div>
        <div className="ml-4 space-y-1 w-3/4">
          <p className="text-sm font-medium leading-none">
            Azure & Cloud Computing
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="w-full flex flex-row justify-between ">
            {" "}
            <span className="text-xs md:text-sm text-muted-foreground flex flex-row">
              <GiBlackBook size={17} className="mt-[0.1rem]" />
              &nbsp;27 Chapters
            </span>
            <span className="text-xs md:text-sm text-muted-foreground flex flex-row">
              <TiTime size={17} className="mt-[0.1rem]" />
              &nbsp;36 Hours
            </span>
            <span className="text-xs md:text-sm text-muted-foreground flex flex-row">
              <FaChalkboardTeacher size={17} className="mt-[0.1rem]" />
              &nbsp;Joe Marshall
            </span>
          </div>
        </div>
        <div className="ml-auto mr-4 font-medium ">
          <IoIosArrowForward />
        </div>
      </div>
      <div className="flex items-center">
        <div className="h-12 w-12 bg-[#00A76F]  rounded-md flex items-center justify-center">
          <span className="text-white">
            <IoBookSharp size={20} />
          </span>
        </div>
        <div className="ml-4 space-y-1 w-3/4">
          <p className="text-sm font-medium leading-none">English Lectures</p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="w-full flex flex-row justify-between ">
            {" "}
            <span className="text-xs md:text-sm text-muted-foreground flex flex-row">
              <GiBlackBook size={17} className="mt-[0.1rem]" />
              &nbsp;27 Chapters
            </span>
            <span className="text-xs md:text-sm text-muted-foreground flex flex-row">
              <TiTime size={17} className="mt-[0.1rem]" />
              &nbsp;36 Hours
            </span>
            <span className="text-xs md:text-sm text-muted-foreground flex flex-row">
              <FaChalkboardTeacher size={17} className="mt-[0.1rem]" />
              &nbsp;Joe Marshall
            </span>
          </div>
        </div>
        <div className="ml-auto mr-4 font-medium ">
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
}
