"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface Option {
  label: string;
  value: string;
  children?: Option[];
}

interface CascaderProps {
  options: Option[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  multiple?: boolean;
  placeholder?: string;
}

interface SelectedPath {
  path: string[];
  value: string;
}

export default function MyCascader({
  options,
  defaultValue = [],
  onChange,
  multiple = false,
  placeholder = "请选择"
}: CascaderProps) {
  const [selectedPaths, setSelectedPaths] = useState<SelectedPath[]>([]);
  const [open, setOpen] = useState(false);

  // 递归查找选中值的完整路径
  const findPath = (
    options: Option[],
    targetValue: string,
    currentPath: string[] = []
  ): string[] | null => {
    for (const option of options) {
      const newPath = [...currentPath, option.label];
      if (option.value === targetValue) {
        return newPath;
      }
      if (option.children) {
        const found = findPath(option.children, targetValue, newPath);
        if (found) return found;
      }
    }
    return null;
  };

  // 初始化默认值
  useEffect(() => {
    const paths: SelectedPath[] = [];
    defaultValue.forEach((value) => {
      const path = findPath(options, value);
      if (path) {
        paths.push({ path, value });
      }
    });
    setSelectedPaths(paths);
  }, [defaultValue, options]);

  const handleSelect = (option: Option, parentPath: string[] = []) => {
    const currentPath = [...parentPath, option.label];
    
    setSelectedPaths((prev) => {
      let newPaths: SelectedPath[];
      
      if (multiple) {
        const exists = prev.some((p) => p.value === option.value);
        if (exists) {
          newPaths = prev.filter((p) => p.value !== option.value);
        } else {
          newPaths = [...prev, { path: currentPath, value: option.value }];
        }
      } else {
        newPaths = [{ path: currentPath, value: option.value }];
        setOpen(false);
      }
      
      onChange?.(newPaths.map((p) => p.value));
      return newPaths;
    });
  };

  const isSelected = (value: string) => {
    return selectedPaths.some((p) => p.value === value);
  };

  const renderOptions = (options: Option[], parentPath: string[] = []) => {
    return options.map((option) => {
      if (option.children && option.children.length > 0) {
        return (
          <DropdownMenuSub key={option.value}>
            <DropdownMenuSubTrigger className="flex items-center justify-between">
              <span>{option.label}</span>
              {isSelected(option.value) && <Check className="w-4 h-4 ml-2" />}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {renderOptions(option.children, [...parentPath, option.label])}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem
          key={option.value}
          className={cn(
            "flex items-center justify-between",
            isSelected(option.value) && "bg-accent"
          )}
          onClick={() => handleSelect(option, parentPath)}
        >
          <span>{option.label}</span>
          {isSelected(option.value) && <Check className="w-4 h-4 ml-2" />}
        </DropdownMenuItem>
      );
    });
  };

  const displayText = selectedPaths.length > 0
    ? selectedPaths.map(p => p.path.join(" / ")).join(", ")
    : placeholder;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="min-w-[200px] justify-start text-left font-normal"
        >
          <span className="truncate">{displayText}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {renderOptions(options)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}