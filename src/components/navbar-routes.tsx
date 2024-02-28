"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
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
export const NavbarRoutes = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter()

  async function logout() {
      await signOut({
          redirect: false
      })

      router.replace('/sign-in')
  }
  return (
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
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );
};
