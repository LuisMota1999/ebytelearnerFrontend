import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SessionItemProps {
  SessionCourseName: string;
  SessionIcon: string;
  SessionTeacher: string;
  SessionClassID: string;
  SessionChapter: string;
  SessionSchedule: string;
  ClassName?: string;
}

const SessionItem: React.FC<SessionItemProps> = ({
  SessionCourseName,
  SessionIcon,
  SessionTeacher,
  SessionClassID,
  SessionChapter,
  SessionSchedule,
  ClassName,
}) => {
  return (
    <div>
      <div className="flex items-center cursor-pointer  ">
        <div
          className={cn(
            "h-14 w-14 rounded-md flex items-center justify-center lg:hidden 2xl:flex",
            ClassName
          )}
        >
          {SessionIcon !== null ? (
            <Image
              src={SessionIcon}
              alt={SessionIcon}
              width={50}
              height={50}
              className="h-full rounded-md"
              loading="lazy"
            />
          ) : (
            <span className="text-white"></span>
          )}
        </div>
        <div className="ml-4 space-y-1 w-3/4">
          <div className="flex flex-row justify-between">
            <p className="text-sm font-semibold leading-none">
              {SessionCourseName}{" "}
            </p>
            <p className="text-sm font-medium leading-none text-muted-foreground">
              Class ID: {SessionClassID}
            </p>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
            <span className="font-semibold">Teacher:</span>&nbsp;
            {SessionTeacher}
          </p>
          <p className="text-xxs md:text-sm text-muted-foreground line-clamp-2">
            <span className="font-semibold">Chapter:</span>&nbsp;{" "}
            {SessionChapter}
          </p>

          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 flex flex-column justify-between m-0">
            <span className="mt-3">{SessionSchedule}</span>
            <Button size="sm">Join Session</Button>
          </p>
        </div>
      </div>
      <div className="my-4 pr-6">
        <Separator/>
      </div>
    </div>
  );
};

export default SessionItem;
