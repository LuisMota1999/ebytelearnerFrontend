"use client";

import CoursesList from "@/components/course/course-List";
import { Button } from "@/components/ui/button";
import { Course } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

async function fetchCoursesData(session: any) {
  try {
    const returnRowsParam = session?.AccessToken ? `?returnRows=${100}` : "";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEXT_URL}/Course/All${returnRowsParam}`,
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

const CoursesPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Enable auto conversion to numbers
    defaultValues: {
      courseName: "",
      courseDescription: "",
      coursePrice: "", // Adjusted default value to number
    },
  });
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const { isSubmitting } = form.formState;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseData] = await Promise.all([fetchCoursesData(session)]);
        setCourses(courseData);
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
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const filteredCourses = courses.filter((course) =>
    course.CourseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        const updatedCourses = await fetchCoursesData(session);
        setCourses(updatedCourses);
        form.reset();

        setShowModal(false);
        toast({
          title: "Course created with success.",
          description: "Good Job.",
        });
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
    <div className="p-4 h-full">
      <div className="flex flex-row justify-between mb-2">
        <div className="bg-white w-64 p-2 flex items-center mb-3 border-b border-t border-l border-r border-zinc-200 rounded-full">
          <FaSearch className="text-gray-400 mr-2"></FaSearch>
          <input
            className="bg-white outline-none text-sm flex-1"
            type="text"
            name="search"
            value={searchQuery}
            placeholder="Search for a course..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogTrigger asChild>
            <Button variant="green">New Course</Button>
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
                              placeholder="e.g 100.99"
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

      <div className="h-[95%]">
        <CoursesList courses={filteredCourses} />
      </div>
    </div>
  );
};

export default CoursesPage;
