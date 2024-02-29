"use client"

import { Skeleton } from "@/ui/skeleton"
import { NavbarSkeleton } from "./navbar"

export const SearchPageSkeleton = () => {
  return (
    <div className="bg-DARK_SECONDARY_BACKGROUND rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <NavbarSkeleton>
        <div className="mb-2 flex flex-col gap-y-6">
          <Skeleton className="h-8 w-[180px]" />
          <Skeleton className="h-12 w-full" />
        </div>
      </NavbarSkeleton>
    </div>
  )
}