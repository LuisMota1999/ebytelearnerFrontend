"use client";

import Image from "next/image";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import CourseCardDetails from "./course-detail-item";

interface CourseProps {
  CourseId: string;
  CourseName: string;
  CourseDescription: string;
  CoursePrice: number;
  CourseImage: string;
  CourseChapters: number;
  CourseTeacher: string;
}

const CourseCard: React.FC<CourseProps> = ({
  CourseId,
  CourseName,
  CourseDescription,
  CoursePrice,
  CourseImage,
  CourseChapters,
  CourseTeacher,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`courses/${CourseId}`);
      }}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 h-full w-full"
    >
      <div className="flex flex-col justify-between h-full">
        {/* Image & actions */}
        <div className="aspect-video rounded-xl bg-gray-100 relative">
          <Image
            src={CourseImage}
            alt="Random"
            fill
            className="aspect-square object-cover rounded-md"
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              <IconButton
                onClick={() => {}}
                icon={<Expand size={20} className="text-gray-600" />}
              />
              <IconButton
                onClick={() => {}}
                icon={<ShoppingCart size={20} className="text-gray-600" />}
              />
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="flex flex-col justify-between flex-1 mt-3">
          <div>
            <p className="font-semibold text-lg">{CourseName}</p>
            <p className="text-sm text-gray-500 line-clamp-3">
              {CourseDescription}
            </p>
          </div>

          <CourseCardDetails
            CourseEstimatedTime={CourseChapters * 2}
            CourseChapter={CourseChapters}
            CourseTeacher={CourseTeacher}
          />
        </div>
        {/* Price & Reiew */}
        <div className="flex items-center justify-between mt-3">
          <Currency value={CoursePrice} />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
