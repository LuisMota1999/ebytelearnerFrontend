"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Course } from "@/types/types";
import HeaderWithDropdown from "./data-table-header";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "CourseName",
    header: ({ column }) => {
      return (
        <HeaderWithDropdown
          columnName="Name"
          onVisible={(state: boolean) => column.toggleVisibility(state)}
          onClick={(state: boolean) => column.toggleSorting(state)}
        />
      );
    },
    cell: ({ row }) => {
      const { Id } = row.original;
      return (
        <Link href={`/teacher/courses/${Id}`} className="hover:underline">
            {row.getValue("CourseName")}
        </Link>
      );
    },
    filterFn: 'includesString'
  },
  {
    accessorKey: "CoursePrice",
    header: ({ column }) => {
      return (
        <HeaderWithDropdown
          columnName="Price"
          onVisible={(state: boolean) => column.toggleVisibility(state)}
          onClick={(state: boolean) => column.toggleSorting(state)}
        />
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("CoursePrice") || "0");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="px-4">{formatted}</div>;
    },
    filterFn: 'inNumberRange',
  },
  {
    accessorKey: "IsPublished",
    header: ({ column }) => {
      return (
        <HeaderWithDropdown
          columnName="Published"
          onVisible={(state: boolean) => column.toggleVisibility(state)}
          onClick={(state: boolean) => column.toggleSorting(state)}
        />
      );
    },
    
    cell: ({ row }) => {
      const isPublished = row.getValue("IsPublished") || false;

      return (
        <div className="px-6">
          <Badge className={cn("bg-slate-500", isPublished && "bg-sky-700")}>
            {isPublished ? "Published" : "Draft"}
          </Badge>
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const { Id } = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild className="outline-none">
  //           <Button variant="ghost" className="h-4 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <Link href={`/teacher/courses/${Id}`}>
  //             <DropdownMenuItem>
  //               <Pencil className="h-4 w-4 mr-2" />
  //               Edit
  //             </DropdownMenuItem>
  //           </Link>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
