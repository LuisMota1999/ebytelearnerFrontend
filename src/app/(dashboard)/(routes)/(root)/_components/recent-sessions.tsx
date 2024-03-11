import SessionItem from "@/components/session/session-item";

interface RecentSessions {
  SessionCourseName: string;
  SessionIcon: string;
  SessionTeacher: string;
  SessionClassID: string;
  SessionChapter: string;
  SessionSchedule: string;
  ClassName?: string;
}

const recentSessionsData: RecentSessions[] = [
  {
    SessionCourseName: "Web Development NextJS 14",
    SessionIcon: "/avatars/avatar-15.png",
    SessionTeacher:"Joe Marshall",
    SessionClassID: "748",
    SessionChapter: "NextJS Introduction",
    SessionSchedule: "11 Mar, 2024 03:00 PM",
    ClassName: "bg-[#d7f4e7]",
  },
  {
    SessionCourseName: "Azure & Cloud Computing",
    SessionIcon: "/avatars/avatar-13.png",
    SessionTeacher: "Jonh Bliss",
    SessionClassID: "143",
    SessionChapter: "Azure First Steps",
    SessionSchedule: "11 Mar, 2024 11:00 AM",
    ClassName: "bg-[#d7f4e7]",
  },
  {
    SessionCourseName: "English Lectures",
    SessionIcon: "/avatars/avatar-11.png",
    SessionTeacher:"Angela Bucrest",
    SessionClassID: "508",
    SessionChapter: "Verb To Be",
    SessionSchedule: "11 Mar, 2024 9:00 AM",
    ClassName: "bg-[#d7f4e7]",
  },
];

export function RecentSessions() {
  return (
    <div className="space-y-8 max-h-[13rem] 2xl:max-h-[20rem] overflow-y-auto">
      {recentSessionsData.map((item, index) => (
        <SessionItem
          key={index}
          SessionCourseName={item.SessionCourseName}
          SessionIcon={item.SessionIcon}
          SessionTeacher={item.SessionTeacher}
          SessionClassID={item.SessionClassID}
          SessionChapter={item.SessionChapter}
          SessionSchedule={item.SessionSchedule}
          ClassName={item.ClassName}
        />
      ))}
    </div>
  );
}
