"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

function splitOnCapitalizedLetters(str: string) {
  const words = [];
  let currentWord = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === char.toUpperCase()) {
      if (currentWord) {
        words.push(currentWord);
        currentWord = '';
      }
    }
    currentWord += char;
  }

  if (currentWord) {
    words.push(currentWord);
  }

  return words.join(' ');
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-1 items-center space-x-2 w-full">
        <Select>
          <SelectTrigger className="w-full outline-none">
            <SelectValue placeholder="Columns" />
          </SelectTrigger>
          <SelectContent>
            {table.getAllLeafColumns().map((column, index) => {
              return <SelectItem key={index} value={column.id}>{splitOnCapitalizedLetters(column.id)}</SelectItem>;
            })}
          </SelectContent>
        </Select>

        <Input
          placeholder="Filter courses.."
          className="max-w-sm outline-none text-sm flex-1 "
          value={
            (table.getColumn("CourseName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("CourseName")?.setFilterValue(event.target.value)
          }
          type="text"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
