"use client"

import { NavbarSkeleton } from "./navbar"

export const LikedPageSkeleton = () => {
  return (
    <div className="bg-DARK_SECONDARY_BACKGROUND rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <NavbarSkeleton>
        <p>..</p>
      </NavbarSkeleton>
    </div>
  )
}