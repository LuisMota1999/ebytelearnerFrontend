"use client";

import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Course } from "@/types/types";
import FileUploader from "@/components/file-upload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
  updateCompletedFields: () => void;
}

export const ImageForm = ({
  initialData,
  courseId,
  updateCompletedFields,
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(
    initialData?.CourseImageURL
      ? `https://lh3.googleusercontent.com/d/${initialData?.CourseImageURL}?authuser=1/view`
      : null
  );
  const toggleEdit = () => setIsEditing((current) => !current);

  const handleImageUpdate = (fileId: string) => {
    if (!initialData?.CourseImageURL) {
      updateCompletedFields();
    }
    setImage(`https://lh3.googleusercontent.com/d/${fileId}?authuser=1/view`);
    setIsEditing(false);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.CourseImageURL && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.CourseImageURL && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!image ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2  ">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={image}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUploader
            method="PUT"
            fileLabel="16:9 aspect ratio recommended"
            courseId={courseId}
            onFileUpdate={(file) => handleImageUpdate(file)}
            url={`${process.env.NEXT_PUBLIC_API_NEXT_URL}/Course/${courseId}/UploadCourseImage`}
          />
        </div>
      )}
    </div>
  );
};
