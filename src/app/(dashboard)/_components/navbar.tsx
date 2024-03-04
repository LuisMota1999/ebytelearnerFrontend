import { NavbarRoutes } from "@/app/(dashboard)/_components/navbar-routes";
import { MobileSidebar } from "./mobilesidebar";

export const Navbar = () => {
    return (
      <div className="p-4 border-b h-full flex items-center backdrop-blur shadow-sm z-50 bg-white">
        <MobileSidebar/>
        <NavbarRoutes/>
      </div>
    )
  }
  