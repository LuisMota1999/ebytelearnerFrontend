"use client";
import { IconBadge } from "@/components/ui/icon-badge";
import { Course, CourseCategory, User } from "@/types/types";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
  Settings,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PriceForm } from "./_components/price-form";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { Banner } from "@/components/ui/banner";
import { CategoryForm } from "./_components/category-form";
import { ImageForm } from "./_components/image-form";
import { Actions } from "./_components/actions";
import { ChaptersForm } from "./_components/chapters-form";
import { AttachmentForm } from "./_components/attachment-form";
import { TeacherForm } from "./_components/teacher-form";
import { CourseAccessForm } from "./_components/course-access-form";

async function fetchCourseData(session: any, courseId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEXT_URL}/Course/${courseId}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
      }
    );
    if (response.ok) {
      const responseBody = await response.json();

      return responseBody;
    } else {
      throw new Error("Failed to fetch course data");
    }
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
}

async function fetchTeacherData(session: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEXT_URL}/User/GetTeachers`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
      }
    );

    if (response.ok) {
      const responseBody = await response.json();

      return responseBody;
    } else {
      throw new Error("Failed to fetch teacher list data");
    }
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    throw error;
  }
}

async function fetchCategoryData(session: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEXT_URL}/Category/All?returnRows=10`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
      }
    );
    if (response.ok) {
      const responseBody = await response.json();
      console.log(responseBody);
      return responseBody;
    } else {
      throw new Error("Failed to fetch course data");
    }
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
}

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const { data: session } = useSession();
  const [course, setCourse] = useState<Course | undefined>();
  const [category, setCategory] = useState<CourseCategory[] | undefined>();
  const [teacher, setTeacher] = useState<User[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, teacherData, courseData] = await Promise.all([
          fetchCategoryData(session),
          fetchTeacherData(session),
          fetchCourseData(session, params.courseId),
        ]);
        setCategory(categoryData);
        setTeacher(teacherData);
        setCourse(courseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const requiredFields = [
    course?.CourseName,
    course?.CourseDescription,
    course?.CoursePrice,
    course?.CourseCategory,
    course?.CourseTeacher,
    course?.CourseModules,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!course?.IsPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={course!?.Id}
            isPublished={course?.IsPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course!} courseId={course!?.Id} />
            <DescriptionForm initialData={course!} courseId={course!?.Id} />
            <ImageForm initialData={course!} courseId={course!?.Id} />
            <CategoryForm
              initialData={course!}
              courseId={course!?.Id}
              options={category!?.map((c) => ({
                label: c.CategoryName,
                value: c.Id,
              }))}
            />
            <TeacherForm
              initialData={course!}
              courseId={course!?.Id}
              options={teacher!?.map((c) => ({
                label: c.Username,
                value: c.Id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm initialData={course!} courseId={course!?.Id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course!} courseId={course!?.Id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm initialData={course!} courseId={course!?.Id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Settings} />
                <h2 className="text-xl">Course Settings</h2>
              </div>
              <CourseAccessForm initialData={course!} courseId={course!?.Id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
