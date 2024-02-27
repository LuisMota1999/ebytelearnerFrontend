"use client"
import React from 'react';
import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Link from 'next/link';
import ButtonLogout from './buttonLogout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSession } from "next-auth/react";
export const NavbarRoutes = () => {
    const pathname = usePathname();
    const isTeacherPage = pathname?.startsWith('/teacher');
    const isCoursePage = pathname?.includes('/courses');
    const { data: session } = useSession();
    
    return (
        <div className="flex items-center ml-auto relative">
            {isTeacherPage || isCoursePage ? (
                <Link href="/">
                    <Button size="sm" variant="ghost">
                        <LogOut className="h-4 w-4 mr-2" />
                        Exit
                    </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses">
                    <Button size="sm" variant="ghost">
                        Teacher Mode
                    </Button>
                </Link>
            )}

            <div className="relative">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <div className="absolute right-0 mt-2">
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{session?.User.Username}</DropdownMenuLabel>
                            <DropdownMenuLabel>{session?.User.Email}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Home</DropdownMenuItem>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <ButtonLogout />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </div>
                </DropdownMenu>
            </div>
        </div>
    );
};
