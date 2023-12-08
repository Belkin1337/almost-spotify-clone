"use client"

import { Skeleton } from "../skeleton"
import { NavbarSkeleton } from "./navbar"

export const MainPageSkeleton = () => {
  return (
    <div className="bg-DARK_SECONDARY_BACKGROUND rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <NavbarSkeleton>
        <div className="mb-2">
          <Skeleton className="h-6 w-[160px]" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cold-3 2xl:grid-cols-4 gap-3 mt-4">
            <button className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
              <div className="relative min-h-[82px] min-w-[82px]">
                <Skeleton className="w-full h-full" />
              </div>
              <Skeleton className="h-6 w-[160px]" />
              <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-MAIN p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-105">
                <Skeleton className="rounded-full h-[24px] w-[24px]" />
              </div>
            </button>
          </div>
        </div>
      </NavbarSkeleton>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-[260px]" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
          <Skeleton className="h-[240px] w-full rounded-md" />
          <Skeleton className="h-[240px] w-full rounded-md" />
          <Skeleton className="h-[240px] w-full rounded-md" />
          <Skeleton className="h-[240px] w-full rounded-md" />
          <Skeleton className="h-[240px] w-full rounded-md" />
          <Skeleton className="h-[240px] w-full rounded-md" />
          <Skeleton className="h-[240px] w-full rounded-md" />
          <Skeleton className="h-[240px] w-full rounded-md" />
        </div>
      </div>
    </div>
  )
}