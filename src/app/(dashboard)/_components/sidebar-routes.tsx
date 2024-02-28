"use client";

import { BarChart, Calendar, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";

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
]

const guestRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/user/courses",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: Calendar,
    label: "Calendar",
    href: "/teacher/calendar",
  },
]

export const SidebarRoutes = () => {
  const session = useSession();

  const routesRoleBased = session.data?.Role == "Admin" ? teacherRoutes : guestRoutes;

  
  return (
    <div className="flex flex-col w-full">
      {sharedRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
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