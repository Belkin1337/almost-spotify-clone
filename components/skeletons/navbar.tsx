"use client"

import { Skeleton } from "@/ui/skeleton"

export const NavbarSkeleton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`h-fit bg-gradient-to-b from-MAIN_VIOLET/10 to-transparent rounded-sm p-4`}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <div className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition">
            <Skeleton className="h-[35px] w-[35px] rounded-full" />
          </div>
          <div className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition">
            <Skeleton className="h-[35px] w-[35px] rounded-full" />
          </div>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <div className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <Skeleton className="h-[20px] w-[20px]" />
          </div>
          <div className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <Skeleton className="h-[20px] w-[20px]" />
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <Skeleton className="h-[24px] w-[64px]" />
          <Skeleton className="h-[24px] w-[64px]" />
        </div>
      </div>
      {children}
    </div>
  )
}