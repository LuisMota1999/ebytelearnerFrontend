import { cn } from "@/lib/utils";

interface SessionItemProps {
  SessionCourseName: string;
  SessionIcon: any;
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
    <div className="flex items-center">
      <div
        className={cn(
          "h-14 w-14 rounded-md flex items-center justify-center lg:hidden 2xl:flex",
          ClassName
        )}
      >
        <span className="text-white">{SessionIcon}</span>
      </div>
      <div className="ml-4 space-y-1 w-3/4">
        <div className="flex flex-row justify-between">
          <p className="text-sm font-medium leading-none">{SessionTeacher}</p>
          <p className="text-sm font-medium leading-none">{SessionClassID}</p>
        </div>

        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
          {SessionCourseName} {SessionChapter}
        </p>

        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
          {SessionSchedule}
        </p>
      </div>
    </div>
  );
};

export default SessionItem;
