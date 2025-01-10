"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check, Filter } from "lucide-react";

export function DropdownMenuCheckboxes({
  selectedItem,
  setSelectedItem,
  options,
  setOptions,
  loading,
  setLoading,
}) {
  if (loading) {
    return (
      <Button
        variant="outline"
        className="min-w-[180px] bg-white hover:bg-gray-50"
        disabled
      >
        <span className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin mr-2" />
        Loading...
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[200px] bg-white hover:bg-gray-50 flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="truncate">
              {selectedItem ? selectedItem?.label : "Select Category"}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[280px] max-h-[400px] overflow-y-auto bg-white rounded-xl shadow-lg border border-gray-200"
      >
        <DropdownMenuLabel className="px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-100 bg-gray-50">
          Filter by Category
        </DropdownMenuLabel>
        <div className="py-2">
          <DropdownMenuItem
            key="show-all"
            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-150 relative group"
            onSelect={() =>
              setSelectedItem({ label: "Show All", value: "all" })
            }
          >
            <div className="flex items-center gap-2 flex-1">
              <span className="font-medium">Show All Categories</span>
            </div>
            {selectedItem?.value === "all" && (
              <Check className="w-4 h-4 text-blue-600" />
            )}
          </DropdownMenuItem>
          {options.map((option) => (
            <DropdownMenuItem
              key={option.label}
              className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-150 relative group"
              onSelect={() =>
                setSelectedItem({ label: option.label, value: option.value })
              }
            >
              <div className="flex items-center gap-2 flex-1">
                <span>{option.label}</span>
              </div>
              {selectedItem?.value === option.value && (
                <Check className="w-4 h-4 text-blue-600" />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default DropdownMenuCheckboxes;

