"use client"

import React, { useCallback } from "react"
import { VariantProps, cva } from "class-variance-authority"
import { SongTitle } from "./child/song-title"
import { SongAuthor } from "./child/song-author"
import { useRouter } from "next/navigation"
import { SongFollowButton } from "./child/song-follow-button"
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
import { getRelativeTime } from "@/lib/tools/created-at-convert"
import { song_route } from "@/lib/constants/routes"

const songItemVariants = cva("grid grid-rows-1 grid-cols-2 justify-items-start items-center w-full rounded-md", {
  variants: {
    variant: {
      default: "p-2 hover:bg-neutral-700/50 group focus-within:bg-neutral-500",
      player: "",
      library: "p-2 hover:bg-neutral-700/50 cursor-pointer group min-h-[66px] w-full overflow-hidden focus-within:bg-neutral-700"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

export interface SongItemGeneric
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof songItemVariants> {
  list: {
    id?: string,
    data: SongEntity[],
    created_at?: string,
    user_id?: string
  },
  song: SongEntity,
  follow?: boolean,
  player?: boolean,
  library?: boolean,
}

export const SongItem = ({
  variant,
  className,
  follow,
  library,
  player,
  list,
  song,
}: SongItemGeneric) => {
  const { push } = useRouter()
  const { isSongWidgetVisible, toggleSongWidget } = useSongWidget();

  const { onPlay } = usePlay({
    song: song,
    songs: list.data
  });

  const created_by_list = getRelativeTime(list?.created_at || '');
  const created_by_main = getRelativeTime(song?.created_at || '');

  const handleClickLibrary = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (library) {
        switch (e.detail) {
          case 1: {
            push(`${song_route}/${song.id}`)

            break;
          }
          case 2: {
            onPlay()

            break;
          }
        }
      }
    }, [library, onPlay, push, song?.id])

  const handleClickFollowed = useCallback(() => {
    if (follow) {
      onPlay();
    }
  }, [follow, onPlay])

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
          <SongPlayingAttribute
            song={song}
            list_id={list.id as string}
          />
        )}
        <SongImageItem
          song={song}
          imageVariant={
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
                  top-1 right-0 w-[24px] h-[24px] bg-black/60 backdrop-blur backdrop-filter 
                  rounded-full hover:scale-[1.16]"
                />
              </UserTips>
            ) : (
              <UserTips action="Показать">
                <IoMdArrowDropup
                  onClick={toggleSongWidget}
                  className="z-50 absolute border-none group-hover:opacity-100 opacity-0 
                  top-1 right-0 w-[24px] h-[24px] bg-black/60 backdrop-blur backdrop-filter 
                  rounded-full hover:scale-[1.16]"
                />
              </UserTips>
            )
          )}
        </SongImageItem>
        <div className="flex flex-col overflow-hidden justify-self-start">
          <SongTitle
            variant={player ? "player" : "default"}
            player={player}
            song={song!}
          />
          <SongAuthor
            variant={player ? "player" : "default"}
            player={player}
            author={song?.author}
          />
        </div>
      </div>
      {!(library || player) && (
        <div className="flex items-center h-full w-full justify-between">
          <div className="flex justify-between items-center h-full">
            <div className="w-[160px] overflow-hidden">
              <SongAlbum album={song.album || song.title} />
            </div>
          </div>
          <div className="w-[134px] overflow-hidden">
            {(created_by_list && follow)
              ? <SongTimestamp date={created_by_main} />
              : <SongTimestamp date={created_by_list} />
            }
          </div>
          <div className="overflow-hidden min-w-[100px] flex items-center justify-between pr-4">
            <div className="group-hover:opacity-100 opacity-0">
              <SongFollowButton songId={song.id} />
            </div>
            <SongDuration duration="1:00" />
          </div>
        </div>
      )}
    </div>
  )
}