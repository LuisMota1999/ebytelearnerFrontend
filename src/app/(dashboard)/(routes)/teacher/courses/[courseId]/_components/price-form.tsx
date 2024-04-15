"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { Course } from "@/types/types";
import { useSession } from "next-auth/react";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
  updateCompletedFields: () => void;
};

const formSchema = z.object({
  price: z.coerce.number(),
});

export const PriceForm = ({
  initialData,
  courseId,
  updateCompletedFields
}: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();
  const toggleEdit = () => setIsEditing((current) => !current);
  const [course, setCourse] = useState<Course>(initialData);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.CoursePrice || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    try {
      setIsEditing(true); 
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_NEXT_URL}/Course/Update/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
        body: JSON.stringify({
          coursePrice: values.price,
        }),
      });
      if (response.ok) {
        if (course?.CoursePrice > 0 ){
          updateCompletedFields();
        }

        const updatedCourse: Course = await response.json();
        
        setCourse(updatedCourse);
        toast.success("Course price updated with success!");
        toggleEdit();
      } else {
        throw new Error("Failed to create module");
      } 
  } catch {
    toast.error("Something went wrong");
  }
}


  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course price
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !course?.CoursePrice && "text-slate-500 italic"
        )}>
          {course?.CoursePrice
            ? formatPrice(course.CoursePrice)
            : "No price"
          }
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      disabled={isSubmitting}
                      placeholder="Set a price for your course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}