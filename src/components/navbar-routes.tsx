"use client";

import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import ButtonLogout from "./ButtonLogout";

export const NavbarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");

    return (<div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
            <Link href="/">
                <Button size="sm" variant="ghost">
                    <LogOut className="h-4 w-4 mr-2"/>
                    Exit
                </Button>
            </Link>
        ): (
            <Link href="/teacher/courses">
                <Button size="sm" variant="ghost">
                    Teacher Mode
                </Button>
            </Link>
        )}
        <ButtonLogout/>
       
    </div>)
}