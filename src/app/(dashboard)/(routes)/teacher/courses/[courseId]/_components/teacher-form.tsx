"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Course } from "@/types/types";
import Combobox from "@/components/ui/combobox";
import { useSession } from "next-auth/react";


interface TeacherFormOptionsProps {
  label: string;
  value: string;
}

interface TeacherFormProps {
  initialData: Course;
  courseId: string;
  options: TeacherFormOptionsProps[];
  updateCompletedFields: () => void;
}

const formSchema = z.object({
  teacherId: z.string().min(1),
});

export const TeacherForm = ({
  initialData,
  courseId,
  options,
  updateCompletedFields,
}: TeacherFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();
  const toggleEdit = () => setIsEditing((current) => !current);
  const [course, setCourse] = useState<Course>(initialData);
  const [selectedOption, setSelectedOption] = useState<
  TeacherFormOptionsProps | undefined
  >({
    label: initialData?.CourseTeacher?.Username,
    value: initialData?.CourseTeacher?.Id,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacherId: initialData?.CourseTeacher?.Id || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsEditing(true); // Set loading state to true before fetch
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_NEXT_URL}/Course/Update/${courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.AccessToken}`,
          },
          body: JSON.stringify({
            courseTeacherID: values.teacherId,
          }),
        }
      );
      if (response.ok) {
        if (!selectedOption?.label) {
          updateCompletedFields();
        }
        const updatedCourse: Course = await response.json();

        setCourse(updatedCourse);
        toast.success("Course teacher updated with success!");
        const initialSelectedOption = options.find(
          (option) => option.value === updatedCourse?.CourseTeacher?.Id
        );
        setSelectedOption(initialSelectedOption);
        toggleEdit();
      } else {
        console.log(response);
        throw new Error("Failed to update teacher course!");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Teacher
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Teacher
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !course?.CourseTeacher?.Id && "text-slate-500 italic"
          )}
        >
          {selectedOption?.label || "No teacher"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="teacherId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
