"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import AccordionSidebarComponent from "./sidebar-accordion";
import ButtonSidebarComponent from "./sidebar-button";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  children: SidebarItemChildrenProps[];
}

interface SidebarItemChildrenProps {
  icon?: LucideIcon;
  label?: string;
  href?: string;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  children,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <>
      {children.length > 0 ? (
        <AccordionSidebarComponent label={label} children={children} isActive={isActive} Icon={Icon} />
      ) : (
        <ButtonSidebarComponent label={label} onClick={onClick} isActive={isActive} Icon={Icon} />
      )}
    </>
  );
  
};
