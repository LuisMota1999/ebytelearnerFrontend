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

interface CategoryOptionsProps {
  label: string;
  value: string;
}

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: CategoryOptionsProps[];
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

export const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();
  const toggleEdit = () => setIsEditing((current) => !current);
  const [course, setCourse] = useState<Course>(initialData);
  const [selectedOption, setSelectedOption] = useState<
    CategoryOptionsProps | undefined
  >({
    label: initialData?.CourseCategory?.CategoryName,
    value: initialData?.CourseCategory?.Id,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: course?.CourseCategory?.Id || "",
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
            categoryId: values.categoryId,
          }),
        }
      );
      if (response.ok) {
        const updatedCourse: Course = await response.json();
        setCourse(updatedCourse);
        toast.success("Course category updated with success!");
        toggleEdit();

        const initialSelectedOption = options.find(
          (option) => option.value === updatedCourse?.CourseCategory?.Id
        );
        setSelectedOption(initialSelectedOption);
        console.log(initialSelectedOption?.label);
      } else {
        throw new Error("Failed to update course category");
      }
    } catch (error) {
      toast.error("Something went wrong.. Try again later");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !course?.CourseCategory?.Id && "text-slate-500 italic"
          )}
        >
          {selectedOption?.label || "No category"}
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
              name="categoryId"
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
