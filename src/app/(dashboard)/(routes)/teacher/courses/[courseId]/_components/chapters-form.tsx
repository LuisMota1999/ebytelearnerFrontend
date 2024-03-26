"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
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

import { ChaptersList } from "./chapters-list";
import { CourseModule, Course } from "@/types/types";
import { useSession } from "next-auth/react";

interface ChaptersFormProps {
  initialData: Course & { CourseModules: CourseModule[] };
  courseId: string;
}

const formSchema = z.object({
  moduleName: z.string().min(1),
});

export const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: session } = useSession();
  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };
  const [courseModules, setCourseModules] = useState<CourseModule[]>(initialData.CourseModules); // Manage course modules separately


  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      moduleName: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreating(true); // Set loading state to true before fetch
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_NEXT_URL}/Module/Create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
        body: JSON.stringify({
          moduleName: values.moduleName,
          courseId: courseId,
        }),
        
      });
      if (response.ok) {
        const newModule: CourseModule = await response.json();
        // Update courseModules state by adding the new module
        setCourseModules(prevModules => [...prevModules, newModule]);
        toast.success("Chapter created");
        toggleCreating();
      } else {
        throw new Error("Failed to create module");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
        setIsCreating(false); // Reset loading state after fetch completes
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
    //   setIsUpdating(true);

    //   await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
    //     list: updateData,
    //   });
    //   toast.success("Chapters reordered");
    //   router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="moduleName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !courseModules.length && "text-slate-500 italic"
          )}
        >
          {!courseModules.length && "No chapters"}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={courseModules || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};
