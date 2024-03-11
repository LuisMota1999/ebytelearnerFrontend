"use client";

import { BarChart, Calendar, Compass, Layout, List, SquarePen } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { useSession } from "next-auth/react";

const sharedRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
    children: [],
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
    children: [],
  },
  {
    icon: List,
    label: "My Courses",
    href: "/courses",
    children: [
      {
        icon: SquarePen,
        label: "Create",
        href: "/courses/create",
      },
      {
        icon: SquarePen,
        label: "Create",
        href: "/courses/create",
      },
    ],
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/courses",
    children: [
      {
        icon: SquarePen,
        label: "Create",
        href: "/courses/create",
      },
      {
        icon: SquarePen,
        label: "Create",
        href: "/courses/create",
      },
    ],
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/analytics",
    children: [],
  },
  {
    icon: Calendar,
    label: "Calendar",
    href: "/calendar",
    children: [],
  },
];

export const SidebarRoutes = () => {
  const session = useSession();

  // Combine sharedRoutes and teacherRoutes and remove duplicates
  const allRoutes = [
    ...sharedRoutes,
    ...teacherRoutes.filter(
      (teacherRoute) =>
        !sharedRoutes.some(
          (sharedRoute) => sharedRoute.href === teacherRoute.href
        )
    ),
  ];

  // If the user is Admin or Teacher, show all routes, otherwise show only sharedRoutes
  const routesRoleBased =
    session.data?.Role === "Admin" || session.data?.Role === "Teacher"
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
