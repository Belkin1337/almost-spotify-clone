"use client"

import Image from "next/image"
import React from "react"
import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { VariantProps, cva } from "class-variance-authority"
import { SongTitle } from "./child/song-title"
import { SongAuthor } from "./child/song-author"
import { useRouter } from "next/navigation"
import { FollowTrackButton } from "../buttons/follow/follow-button"
import { SongPlayingAttribute } from "./child/song-playing-attribute"
import { usePlay } from "@/lib/hooks/player/use-play"
import { useSongWidget } from "@/lib/hooks/actions/song/use-song-widget"
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { UserTips } from "../tooltip/action"
import { SongImageItem } from "./child/song-image"
import { SongAlbum } from "./child/song-album"
import { SongTimestamp } from "./child/song-timestamp"
import { SongDuration } from "./child/song-duration"
import { SongEntity } from "@/types/entities/song"

const songItemVariants = cva("grid grid-rows-1 grid-cols-2 justify-items-start items-center w-full rounded-md", {
  variants: {
    variant: {
      default: "p-2 hover:bg-neutral-800/50 group focus-within:bg-neutral-500",
      player: "",
      library: "p-2 hover:bg-neutral-800/50 cursor-pointer group min-h-[66px] w-full overflow-hidden focus-within:bg-neutral-500"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

export interface SongItemGeneric
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof songItemVariants> {
  data: SongEntity,
  array_data: SongEntity[],
  follow?: boolean,
  player?: boolean,
  library?: boolean,
  onClicked?: (id: string) => void,
}

export const SongItem = ({
  variant,
  className,
  follow,
  library,
  player,
  data,
  array_data
}: SongItemGeneric) => {
  const imageUrl = useLoadImage(data)
  const router = useRouter()
  const { onPlay } = usePlay();
  const { isSongWidgetVisible, toggleSongWidget } = useSongWidget();

  const handleClickLibrary = (e: React.MouseEvent<HTMLElement>) => {
    if (library) {
      switch (e.detail) {
        case 1: {
          router.push(`/home/track/${data.id}`)
          break;
        }
        case 2: {
          onPlay({ 
            songId: data?.id,
            songs: array_data
          })
          break;
        }
      }
    }
  }

  const handleClickFollowed = () => {
    if (follow) {
      onPlay({ 
        songId: data?.id,
        songs: array_data
      })
    }
  }

  return (
    <div
      onClick={handleClickLibrary}
      onDoubleClick={handleClickFollowed}
      className={songItemVariants(({
        variant,
        className
      }))}
    >
      <div className="flex items-center gap-x-2 min-w-[264px] max-w-[564px] overflow-hidden">
        {!(library || player) && (
          <SongPlayingAttribute dataId={data.id} />
        )}
        <SongImageItem imageVariant={
          follow ? "follow" :
            player ? "player" :
              library ? "library" :
                undefined
        }>
          {player && (
            isSongWidgetVisible ? (
              <UserTips action="Cкрыть">
                <IoMdArrowDropdown
                  onClick={toggleSongWidget}
                  className="z-50 absolute border-none group-hover:opacity-100 opacity-0 
                  top-1 right-0 w-[24px] h-[24px] bg-black/60 backdrop-blur backdrop-filter rounded-full hover:scale-[1.16]"
                />
              </UserTips>
            ) : (
              <UserTips action="Показать">
                <IoMdArrowDropup
                  onClick={toggleSongWidget}
                  className="z-50 absolute border-none group-hover:opacity-100 opacity-0 
                  top-1 right-0 w-[24px] h-[24px] bg-black/60 backdrop-blur backdrop-filter rounded-full hover:scale-[1.16]"
                />
              </UserTips>
            )
          )}
          <Image
            fill
            src={imageUrl || "/images/liked.png"}
            alt={data?.title || "song"}
            loading="lazy"
            draggable="false"
            className="object-cover"
          />
        </SongImageItem>
        <div className="flex flex-col overflow-hidden justify-self-start">
          <SongTitle
            variant={player ? "player" : "default"}
            player={player}
            data={data!}
          />
          <SongAuthor
            variant={player ? "player" : "default"}
            player={player}
            data={data!}
          />
        </div>
      </div>
      {!(library || player) && (
        <div className="flex items-center h-full w-full justify-between">
          <div className="flex items-center h-full">
            <div className="w-[240px] overflow-hidden">
              <SongAlbum album={data.album || data.title} />
            </div>
            <div className="w-[134px] overflow-hidden">
              <SongTimestamp date={'1 день назад'} />
            </div>
          </div>
          <div className="overflow-hidden min-w-[100px] flex items-center justify-between pr-4">
            <div className="group-hover:opacity-100 opacity-0">
              <FollowTrackButton songId={data.id} />
            </div>
            <SongDuration duration="1:00" />
          </div>
        </div>
      )}
    </div>
  )
}