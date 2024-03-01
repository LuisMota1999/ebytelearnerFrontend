"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const { setTheme } = useTheme();
  const theme = useTheme().theme;
  async function logout() {
    await signOut({
      redirect: true,
    });

    router.replace("/sign-in");
  }
  return (
    <div className="w-full flex flex-row-reverse">

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session?.User.Username}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.User.Email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onClick={() =>
                theme === "light" ? setTheme("dark") : setTheme("light")
              }
            >
              Theme
              <DropdownMenuShortcut>
                <div className="flex items-center justify-end">
                  <Sun
                    size={18}
                    className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                  />
                  <Moon className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </div>
              </DropdownMenuShortcut>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
