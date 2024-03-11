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
];

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
];

export const SidebarRoutes = () => {
  const session = useSession();

  // Combine sharedRoutes and teacherRoutes and remove duplicates
  const allRoutes = [
    ...sharedRoutes,
    ...teacherRoutes.filter(
      (teacherRoute) =>
        !sharedRoutes.some((sharedRoute) => sharedRoute.href === teacherRoute.href)
    ),
  ];

  // If the user is Admin or Teacher, show all routes, otherwise show only sharedRoutes
  const routesRoleBased =
    session.data?.Role === "Admin" || session.data?.Role === "Teacher"
      ? allRoutes
      : sharedRoutes;

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
  );
};
