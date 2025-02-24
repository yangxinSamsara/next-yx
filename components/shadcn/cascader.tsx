"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuGroup,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
  children?: Option[];
}

const initialOptions: Option[] = [
  {
    label: "Option 1",
    value: "option1",
    children: [
      { label: "Option 1-1", value: "option1-1" },
      { label: "Option 1-2", value: "option1-2" },
    ],
  },
  {
    label: "Option 2",
    value: "option2",
    children: [
      { label: "Option 2-1", value: "option2-1" },
      { label: "Option 2-2", value: "option2-2" },
    ],
  },
];

export default function Cascader() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (option: Option) => {
    setSelectedItems((prevItems) => {
      const parentOption = initialOptions.find((parent) =>
        parent.children?.some((child) => child.value === option.value)
      );
      if (parentOption) {
        return [parentOption.label, option.label];
      }
      return prevItems;
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedItems.length > 0 ? selectedItems.join(" / ") : "请选择"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {initialOptions.map((option) => (
          <DropdownMenuSub key={option.value}>
            <DropdownMenuSubTrigger>{option.label}</DropdownMenuSubTrigger>
            <DropdownMenuPortal >
              <DropdownMenuSubContent>
                {option.children?.map((child) => (
                  <DropdownMenuItem
                    className={cn({ "bg-primary": selectedItems.includes(child.value) })}
                    onClick={() => handleSelect(child)}
                    key={child.value}
                  >
                    {child.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
