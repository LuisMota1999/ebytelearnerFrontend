import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = ({session} : any) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto overflow-x-hidden bg-white shadow-sm">
      <div className="p-6 flex flex-col justify-center items-center">
        <Logo/>
      </div>
      <div className="flex flex-col w-full h-full">
        <SidebarRoutes session={session}/>
      </div>
    </div>
  );
};
