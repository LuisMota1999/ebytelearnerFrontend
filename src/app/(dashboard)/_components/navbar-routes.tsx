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
import Image from "next/image";
import { getFlagData } from "@/app/actions";

export const NavbarRoutes = ({session}: any) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("United Kingdom");
  const [loading, setLoading] = useState<boolean>(true);
  const [flagData, setFlagData] = useState<Country[]>([]);
  const router = useRouter();
  async function logout() {
    await signOut({
      redirect: true,
    });

    router.replace("/sign-in");
  }

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const flagData = await getFlagData();
        setFlagData(flagData);
        setLoading(false);
      } catch (error) {
        throw Error("error");
      }
    };

    fetchFlag();
  }, [session]);

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
      {!loading && (
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
                    <Image
                      src={
                        flagData.find((flagData) => flagData.name === value)
                          ?.flag!
                      }
                      alt={`Flag of ${
                        flagData.find((flagData) => flagData.name === value)
                          ?.name
                      }`}
                      width={28}
                      height={26}
                      className="m-1"
                      loading="lazy"
                    />
                    <span className="hidden md:block">
                      {
                        flagData.find((flagData) => flagData.name === value)
                          ?.name
                      }
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
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === flagData.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />

                        <div key={index} className="flex items-center">
                          <Image
                            src={flagData.flag}
                            alt={`Flag of ${flagData.name}`}
                            width={35}
                            height={40}
                            className="rounded-full mr-2"
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
      )}
    </div>
  );
};
