"use client";

import {
  BarChart,
  Calendar,
  FileHeart,
  GraduationCap,
  Layout,
  List,
  PackageOpen,
  Settings,
  ShieldCheck,
  Trash,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { Session } from "next-auth/core/types";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface RouteProps {
  icon: any;
  label: string;
  href?: string;
  children?: {
    icon: any;
    label: string;
    href: string;
  }[];
}

const sharedRoutes: RouteProps[] = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
    children: [],
  },
];

const privilegedRoutes: RouteProps[] = [
  {
    icon: GraduationCap,
    label: "Courses",
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
        href: "/teacher/courses/grades",
      },
    ],
  },
  {
    icon: PackageOpen,
    label: "Storage",
    children: [
      {
        icon: FileHeart,
        label: "Favorites",
        href: "/teacher/storage/favorites",
      },
      {
        icon: List,
        label: "List",
        href: "/teacher/storage/list",
      },
      {
        icon: Trash,
        label: "Trash",
        href: "/teacher/storage/trash",
      },
    ],
  },

  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
    children: [],
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
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

  const settingsRoute = routesRoleBased.find(
    (route) => route.label === "Settings"
  );
  const otherRoutes = routesRoleBased.filter(
    (route) => route.label !== "Settings"
  );
  const router = useRouter();

  const [currentSelectedItem, setCurrentSelectedItem] =
    useState<string>("Dashboard");
  const [currentHref, setCurrentHref] = useState<string>("/");
  const handleItemClick = (label: string, href: string) => {
    setCurrentSelectedItem(label);
    if (href !== undefined) {
      setCurrentHref(href);
      router.push(href);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="w-full ">
          {otherRoutes.map((route, index) => (
            <SidebarItem
              key={index}
              icon={route.icon}
              label={route.label}
              href={route.href!}
              onClick={() => handleItemClick(route.label, route.href!)}
              children={route.children!}
              currentSelectedItem={currentSelectedItem}
            />
          ))}
        </div>
        <div className="w-full">
          <span className="text-xs text-slate-500 flex justify-center items-center">
            Copyright Luis Mota © 2024{" "}
          </span>
          <Separator />
          {settingsRoute && (
            <SidebarItem
              key="settings"
              icon={settingsRoute.icon}
              label={settingsRoute.label}
              href={settingsRoute.href!}
              onClick={() => handleItemClick(currentSelectedItem, currentHref)}
              children={settingsRoute.children!}
              currentSelectedItem={currentSelectedItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};
