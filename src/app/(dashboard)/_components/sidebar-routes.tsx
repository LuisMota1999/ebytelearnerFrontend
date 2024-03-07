"use client";

import { BarChart, Calendar, Compass, Layout, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { useSession } from "next-auth/react";

const sharedRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
  {
    icon: List,
    label: "My Courses",
    href: "/courses",
  },
]

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/analytics",
  },
  {
    icon: Calendar,
    label: "Calendar",
    href: "/calendar",
  },
]

export const SidebarRoutes = () => {
  const session = useSession();

  const routesRoleBased = session.data?.Role == ("Admin" || "Teacher") ? teacherRoutes : sharedRoutes;

  
  return (
    <div className="flex flex-col w-full">
      {routesRoleBased.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}