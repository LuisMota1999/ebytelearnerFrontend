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
import { useState } from "react";
import { Course } from "@/types/types";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

interface OperatorProps {
  value: string;
  label: string;
}

function splitOnCapitalizedLetters(str: string) {
  const words = [];
  let currentWord = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === char.toUpperCase()) {
      if (currentWord) {
        words.push(currentWord);
        currentWord = "";
      }
    }
    currentWord += char;
  }

  if (currentWord) {
    words.push(currentWord);
  }

  return words.join(" ");
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [selectedColumn, setSelectedColumn] = useState<string | undefined>(
    "CourseName"
  );
  const [operatorOptions, setOperatorOptions] = useState<OperatorProps[]>([]);
  const stringOperator = [
    {
      value: "contains",
      label: "contains",
    },
    {
      value: "startsWith",
      label: "starts with",
    },
    {
      value: "endsWith",
      label: "ends with",
    },
    {
      value: "isEmpty",
      label: "is empty",
    },
    {
      value: "isNotEmpty",
      label: "is not empty",
    },
    {
      value: "isAnyOf",
      label: "is any of",
    },
  ];

  const numericOperator = [
    {
      value: "=",
      label: "=",
    },
    {
      value: "!=",
      label: "!=",
    },
    {
      value: ">",
      label: ">",
    },
    {
      value: "<",
      label: "<",
    },
    {
      value: "<=",
      label: "<=",
    },
    {
      value: "isEmpty",
      label: "is empty",
    },
    {
      value: "isNotEmpty",
      label: "is not empty",
    },
    {
      value: "isAnyOf",
      label: "is any of",
    },
  ];

  const data = table.getRowCount() > 0 ? table.getRow('0').original : null as any;
  const getValueByColumn = <K extends keyof Course>(column: K): Course[K] => {
    return data[column];
  };
  const handleChangeColumn = (value: any) => {
    setSelectedColumn(value);

    const columnType = typeof getValueByColumn(value);

    switch (columnType) {
      case "string":
        setOperatorOptions(stringOperator);
        break;
      case "number":
        setOperatorOptions(numericOperator);
        break;
      default:
        setOperatorOptions([]);
        break;
    }
  };
  return (
    <div className="w-full md:flex py-4">
      <div className="grid gap-2 grid-cols-6">
        <div className="col-span-6 md:col-span-3 lg:col-span-2 flex">
          <Select onValueChange={handleChangeColumn}>
            <SelectTrigger className="w-full outline-none">
              <SelectValue placeholder="Columns" />
            </SelectTrigger>
            <SelectContent>
              {table.getAllLeafColumns().map((column, index) => {
                return (
                  <SelectItem key={index} value={column.id}>
                    {splitOnCapitalizedLetters(column.id)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2 flex">
          <Select>
            <SelectTrigger className="w-full outline-none">
              <SelectValue placeholder="Operator" />
            </SelectTrigger>
            <SelectContent>
              {operatorOptions!?.map((option, index) => {
                return (
                  <SelectItem key={index} value={option.value}>
                    {option.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2 flex">
          <Input
            placeholder="Filter value"
            className="w-full outline-none text-sm flex-1 "
            type={typeof selectedColumn}
            value={
              (table.getColumn(selectedColumn!)?.getFilterValue() as any) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(selectedColumn!)
                ?.setFilterValue(event.target.value)
            }
          />
        </div>
        {isFiltered && (
          <div className="col-span-6 md:col-span-3 lg:col-span-2 flex">
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
