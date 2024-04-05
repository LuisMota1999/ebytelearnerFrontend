"use client";
import { useSession } from "next-auth/react";
import React, { useState, ChangeEvent, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
import { Course } from "@/types/types";
import { Progress } from "./ui/progress";
import axios from "axios";

interface FileUploaderProps {
  courseId: string;
  method: string;
  acceptedFileTypes?: string[] | null;
  url: string;
  maxFileSize?: number;
  allowMultiple?: boolean;
  label?: string;
  labelAlt?: string;
  fileLabel?: string;
  onFileUpdate: (fileId: string) => void;
}

export default function FileUploader(props: FileUploaderProps) {
  const {
    method = "",
    courseId = "",
    fileLabel = "",
    acceptedFileTypes,
    url,
    maxFileSize = 5,
    allowMultiple = false,
    label = "",
    labelAlt = "",
    onFileUpdate,
  } = props;

  const MAX_FILE_BYTES = maxFileSize * 1024 * 1024; // MB to bytes

  const [progress, setProgress] = useState(0);
  const [fileStatus, setFileStatus] = useState<{ [key: string]: string }>({});
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const { data: session } = useSession();
  const [isUploading, setIsUploading] = useState<boolean>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetUploader = () => {
    setFileStatus({});
    setUploadError(null);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fileSelectedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (event.target.files) {
      const files = Array.from(event.target.files);
      let isValid = true; // Flag to check if all files are valid
      let fileErrors: { [key: string]: string } = {};

      for (const file of files) {
        if (file.size > MAX_FILE_BYTES) {
          fileErrors[file.name] = `File size cannot exceed ${maxFileSize} MB`;
          isValid = false;
        }
        if (acceptedFileTypes && !acceptedFileTypes.includes(file.type)) {
          fileErrors[file.name] =
            "File type not accepted. Accepted types: " +
            acceptedFileTypes.join(", ");
          isValid = false;
        }
      }

      if (!isValid) {
        setFileStatus(fileErrors);
      } else {
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = () => {
            const previewUrl = reader.result as string;
            setFileStatus((prev) => ({ ...prev, [file.name]: previewUrl }));
          };
          reader.readAsDataURL(file);

          setSelectedImage(file);
        });
      }
    }
  };
  const fileUploadHandler = (file: File, courseId: string) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseId", courseId);

    axios
      .request({
        url,
        method,
        data: formData,
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          if (total !== null && total !== undefined) {
            const percentage = Math.round((loaded / total) * 100);
            setProgress(percentage);
          }
        },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
      })
      .then((res) => {
        console.log("Upload Complete");
        if (res.status === 200) {
          const responseBody: Course = res.data;
          onFileUpdate(responseBody?.CourseImageURL as string);
          setIsUploading(false);
        }
      });
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full h-60 md:h-52">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{label}</span>
            <span className="label-text-alt">{labelAlt}</span>
          </label>
          <label className="relative block overflow-hidden w-full h-48 text-center bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer">
            <Input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={fileSelectedHandler}
              accept={
                acceptedFileTypes ? acceptedFileTypes.join(",") : undefined
              }
              ref={fileInputRef}
              multiple={allowMultiple}
            />
            <div className="icon flex mt-12 items-center justify-center text-gray-400">
              <FaCloudUploadAlt
                size={80}
                className="text-[#00A76F] hover:text-green-800"
              />
            </div>
            {selectedImage && (
              <Image
                src={URL.createObjectURL(selectedImage)}
                fill
                alt="Thumb"
              />
            )}
          </label>
          <label className="label">
            <span className="label-text-alt text-red-500">{uploadError}</span>
          </label>
          {isUploading && (
            <Progress
              value={progress}
              className="my-2 bg-slate-200"
              indicatorColor="bg-green-800"
            />
          )}
        </div>
      </div>
      <div className="text-xs text-muted-foreground mt-4 flex justify-between">
        <span className="mt-3">{fileLabel}</span>
        <div className="flex items-center gap-x-2">
          <Button
            type="submit"
            disabled={selectedImage != null ? false : true}
            onClick={() => fileUploadHandler(selectedImage, courseId)}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
