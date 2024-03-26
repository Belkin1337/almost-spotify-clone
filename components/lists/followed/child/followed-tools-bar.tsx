"use client"

import React from "react"
import { PlayButton } from "@/components/buttons/play-button"
import { FollowedSearch } from "./followed-search"
import { cva, VariantProps } from "class-variance-authority"
import { SongEntity } from "@/types/entities/song"
import { Typography } from "@/ui/typography"
import { Button } from "@/ui/button"
import { IoIosMore } from "react-icons/io"
import { ShuffleButton } from "@/components/buttons/shuffle-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/ui/dropdown-menu"

const toolsBarVariants = cva(" ", {
  variants: {
    variant: {
      followed: "",
      single: "",
      album: "",
      playlist: "",
      artist: ""
    }
  }
})

interface ToolsBarVariants
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof toolsBarVariants> { }

interface ToolsBarProps extends ToolsBarVariants {
  song: SongEntity,
  list: SongEntity[]
}

export const ToolsBar = ({
  song,
  variant,
  className,
  list
}: ToolsBarProps) => {
  return (
    <div className="flex items-center justify-between p-6 w-full">
      <div className="flex gap-x-8 items-center">
        <PlayButton
          song={song}
          list={list}
          variant="single_page"
        />
        <div className="flex items-center gap-x-6">
          <ShuffleButton />
          {variant === "artist" && (
            <>
              <Button
                className="px-6 py-3 bg-transparent group border hover:scale-[1.06] rounded-full 
                hover:border-white border-neutral-700 flex items-center justify-center"
              >
                <Typography className="group-hover:scale-[1.02] text-sm">
                  Following
                </Typography>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <IoIosMore
                    size={40}
                    className="hover:text-neutral-50 text-neutral-400"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="relative left-14">
                  <DropdownMenuItem>
                    Unfollow
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Go to artist Radio
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
      {variant === "followed" && (
        <div className="">
          <FollowedSearch />
        </div>
      )}
    </div>
  )
}