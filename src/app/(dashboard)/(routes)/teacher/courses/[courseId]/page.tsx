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
  const [data, setData] = useState<{
    course?: Course;
    category?: CourseCategory[];
    teacher?: User[];
    loading: boolean;
    error?: string;
  }>({
    loading: true,
  });
  const [completedFields, setCompletedFields] = useState(0);
  const [totalFields, setTotalFields] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, teacherData, courseData] = await Promise.all([
          fetchCategoryData(session),
          fetchTeacherData(session),
          fetchCourseData(session, params.courseId),
        ]);
        setData({
          course: courseData,
          category: categoryData,
          teacher: teacherData,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setData({ loading: false, error: "Failed to fetch data" });
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  useEffect(() => {
    const requiredFields = [
      data.course?.CourseName,
      data.course?.CourseDescription,
      data.course?.CoursePrice,
      data.course?.CourseCategory,
      data.course?.CourseTeacher,
      data.course?.CourseModules,
    ];

    const totalFields = requiredFields.length;
    setTotalFields(totalFields);

    const completedFields = requiredFields.filter(
      (field) => field !== null && !(Array.isArray(field) && field.length === 0)
    ).length;
    setCompletedFields(completedFields);

    setIsComplete(completedFields === totalFields);
  }, [data]);

  const updateCompletedFields = () => {
    setCompletedFields((prevCompletedFields) => prevCompletedFields + 1);
  };

  if (data.loading) {
    return <div>Loading...</div>;
  }

  if (data.error) {
    return <div>Error: {data.error}</div>;
  }

  return (
    <>
      {!data.course?.IsPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {`(${completedFields}/${totalFields})`}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={data.course!?.Id}
            isPublished={data.course?.IsPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={data.course!} courseId={data.course!?.Id} />
            <DescriptionForm
              initialData={data.course!}
              courseId={data.course!?.Id}
            />
            <ImageForm initialData={data.course!} courseId={data.course!?.Id} updateCompletedFields={updateCompletedFields}/>
            <CategoryForm
              initialData={data.course!}
              courseId={data.course!?.Id}
              options={data.category!?.map((c) => ({
                label: c.CategoryName,
                value: c.Id,
              }))}
              updateCompletedFields={updateCompletedFields}
            />
            <TeacherForm
              initialData={data.course!}
              courseId={data.course!?.Id}
              options={data.teacher!?.map((c) => ({
                label: c.Username,
                value: c.Id,
              }))}
              updateCompletedFields={updateCompletedFields}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm
                initialData={data.course!}
                courseId={data.course!?.Id}
                updateCompletedFields={updateCompletedFields}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm
                initialData={data.course!}
                courseId={data.course!?.Id}
                updateCompletedFields={updateCompletedFields}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm
                initialData={data.course!}
                courseId={data.course!?.Id}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Settings} />
                <h2 className="text-xl">Course Settings</h2>
              </div>
              <CourseAccessForm
                initialData={data.course!}
                courseId={data.course!?.Id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
