import { NavbarRoutes } from "@/app/(dashboard)/_components/navbar-routes";
import { MobileSidebar } from "./mobilesidebar";

export const Navbar = ({session} : any) => {
    return (
      <div className="p-4 border-b h-full flex items-center backdrop-blur shadow-sm z-50 bg-white">
        <MobileSidebar session={session}/>
        <NavbarRoutes session={session}/>
      </div>
    )
  }
  