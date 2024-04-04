"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Course } from "@/types/types";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
const formSchema = z.object({
  courseName: z.string().min(3, {
    message: "Course Name must have at least 3 characters.",
  }),
  courseDescription: z.string().min(3, {
    message: "Course Name must have at least 3 characters.",
  }),
  coursePrice: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
});

export const CourseForm = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Enable auto conversion to numbers
    defaultValues: {
      courseName: "",
      courseDescription: "",
      coursePrice: "", // Adjusted default value to number
    },
  });
  const { isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_NEXT_URL}/Course/Create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.AccessToken}`,
          },
          body: JSON.stringify({
            courseName: values.courseName,
            courseDescription: values.courseDescription,
            coursePrice: values.coursePrice,
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Course created with success.",
          description: "Good Job.",
        });
        const newCourse: Course = await response.json();
        router.push(`/teacher/courses/${newCourse.Id}`);
        form.reset();

        setShowModal(false);
      } else {
        // Handle error response from API
        throw new Error("Failed to create course");
      }
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-2xl font-medium gap-y-2 w-1/2">Courses List</h1>
      <div className="w-1/2 flex flex-row">
        <div className="ml-auto mr-0 lg:mr-2">
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                New course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Course</DialogTitle>
                <DialogDescription>
                  This course creation action cannot be undone. Are you certain
                  you want to permanently publish this course to our platform?
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  id="createCourseForm"
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="courseName" className="text-left">
                        Course Name
                      </Label>
                      <FormField
                        control={form.control}
                        name="courseName"
                        render={({ field }) => (
                          <FormItem className="flex flex-col col-span-3">
                            <FormMessage>
                              {form.formState.errors.courseName?.message}
                            </FormMessage>{" "}
                            <FormControl>
                              <Input
                                disabled={isSubmitting}
                                placeholder="e.g Web Development"
                                className="bg-slate-100 outline-none text-sm flex-1 border-none"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="courseDescription" className="text-left">
                        Course Description
                      </Label>
                      <FormField
                        control={form.control}
                        name="courseDescription"
                        render={({ field }) => (
                          <FormItem className="flex flex-col col-span-3 ">
                            <FormMessage>
                              {form.formState.errors.courseDescription?.message}
                            </FormMessage>{" "}
                            <FormControl>
                              <Textarea
                                disabled={isSubmitting}
                                placeholder="Tell us a little bit about the course"
                                className="resize-none bg-slate-100 outline-none text-sm flex-1 border-none"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="coursePrice" className="text-left">
                        Price
                      </Label>
                      <FormField
                        control={form.control}
                        name="coursePrice"
                        render={({ field }) => (
                          <FormItem className="flex flex-col col-span-3 ">
                            <FormMessage>
                              {form.formState.errors.coursePrice?.message}
                            </FormMessage>{" "}
                            <FormControl>
                              <Input
                                disabled={isSubmitting}
                                placeholder="e.g 79.99"
                                className="bg-slate-100 outline-none text-sm flex-1 border-none"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-x-2">
                    <Button type="submit">Continue</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
