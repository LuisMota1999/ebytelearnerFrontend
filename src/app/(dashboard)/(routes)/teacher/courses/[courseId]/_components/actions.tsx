"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modals";
import { useSession } from "next-auth/react";
import { ToastAction } from "@/components/ui/toast";
import { publishCourse } from "@/app/actions";
import { revalidateTag } from "next/cache";
import { toast } from "@/components/ui/use-toast";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const onClick = async () => {

    try {
      setIsLoading(true);
      await publishCourse(!isPublished, courseId, session);

      revalidateTag("course");
      isPublished ? toast({
        title: "Course published with success.",
        description: "Good Job.",
      }) : toast({
        title: "Course unpublished with success.",
        description: "Good Job.",
      });
      
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);

      //toast.success("Course deleted");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch {
      //toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="green"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading} variant="outline">
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
