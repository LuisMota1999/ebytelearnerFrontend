"use client";
import React, { useEffect, useState } from "react";
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

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Country } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export const NavbarRoutes = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("United Kingdom");
  const { data: session } = useSession();
  const router = useRouter();
  async function logout() {
    await signOut({
      redirect: true,
    });

    router.replace("/sign-in");
  }

  const [flagData, setFlagData] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://countriesnow.space/api/v0.1/countries/flag/images`,
          { cache: "force-cache" }
        );
        const data = await response.json();
        setFlagData(data.data as Country[]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-row-reverse">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="avatars/02.png" loading="lazy" />
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
                <Link href="/profile">Profile</Link>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mx-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-auto justify-between"
            >
              {value ? (
                <div className="flex items-center">
                  <img
                    src={
                      flagData.find((flagData) => flagData.name === value)?.flag
                    }
                    alt={`Flag of ${
                      flagData.find((flagData) => flagData.name === value)?.name
                    }`}
                    className="w-8 h-6 m-1"
                    loading="lazy"
                  />
                  <span className="hidden md:block">
                    {flagData.find((flagData) => flagData.name === value)?.name}
                  </span>
                </div>
              ) : (
                "Select Country..."
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0 mr-4">
            <ScrollArea className="h-96 w-auto rounded-md border p-4">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {flagData.map((flagData, index) => (
                    <CommandItem
                      className="w-10"
                      key={index}
                      value={flagData.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        //setFlag(currentValue === value ? "" : flagData.flag);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === flagData.name ? "opacity-100" : "opacity-0"
                        )}
                      />

                      <div key={index} className="flex items-center">
                        <img
                          src={flagData.flag}
                          alt={`Flag of ${flagData.name}`}
                          className="w-8 h-8 rounded-full mr-2"
                          loading="lazy"
                        />
                        <span>{flagData.name}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
