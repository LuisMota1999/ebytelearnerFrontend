"use client";

import { BarChart, Calendar, Compass, GraduationCap, Layout, List, ShieldCheck, SquarePen } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { Session } from "next-auth/core/types";

const sharedRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
    children: [],
  },
];

const privilegedRoutes = [
  {
    icon: GraduationCap,
    label: "Courses",
    href: "/courses",
    children: [
      {
        icon: List,
        label: "List",
        href: "/teacher/courses",
      },
      {
        icon: Calendar,
        label: "Calendar",
        href: "/teacher/calendar",
      },
      {
        icon: ShieldCheck,
        label: "Grades",
        href: ""
      }
    ],
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
    children: [],
  },
  
];

export const SidebarRoutes: React.FC<{ session: Session }> = ({ session }) => {
  // Now you can directly use the session prop without waiting for it asynchronously
  const allRoutes = [
    ...sharedRoutes,
    ...privilegedRoutes.filter(
      (privilegedRoute) =>
        !sharedRoutes.some(
          (sharedRoute) => sharedRoute.href === privilegedRoute.href
        )
    ),
  ];

  const routesRoleBased =
    session?.Role === "Admin" || session?.Role === "Teacher"
      ? allRoutes
      : sharedRoutes;

  return (
    <div className="flex flex-col w-full">
      {routesRoleBased.map((route, index) => (
        <SidebarItem
          key={index}
          icon={route.icon}
          label={route.label}
          href={route.href}
          children={route.children}
        />
      ))}
    </div>
  );
};

