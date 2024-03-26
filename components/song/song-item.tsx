"use client"

import React, { useCallback } from "react"
import { VariantProps, cva } from "class-variance-authority"
import { SongTitle } from "./child/song-title"
import { SongArtist } from "./child/song-artist"
import { useRouter } from "next/navigation"
import { FollowButton } from "./child/song-follow-button"
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
import { getRelativeTime } from "@/lib/tools/date-convert"
import { song_route } from "@/lib/constants/routes"
import { SongToolsBar } from "./child/song-tools-bar"
import { usePlayer } from "@/lib/hooks/player/use-player"
import { AiFillSound } from "react-icons/ai";
import { useHowlerContext } from "@/lib/hooks/player/use-howler"
// import { useDuration } from "@/lib/hooks/player/use-duration"

const songItemVariants = cva("flex justify-between items-center rounded-md", {
  variants: {
    variant: {
      default: "p-2 hover:bg-neutral-700/50 group focus-within:bg-neutral-700 w-full",
      player: "w-fit",
      library: "p-2 hover:bg-neutral-700/50 cursor-pointer group min-h-[66px] w-full overflow-hidden",
      select: "p-1 cursor-pointer group min-h-[16px] w-full",
      artist_library: "p-2 w-[1200px] group cursor-pointer overflow-hidden hover:bg-neutral-700/50 focus-within:bg-neutral-700"
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
    data?: SongEntity[],
    created_at?: string,
    user_id?: string
  },
  song: SongEntity,
  follow?: boolean,
  player?: boolean,
  select?: boolean,
  library?: boolean,
  page?: boolean
}

// const { formatted } = useDuration(song);

export const SongItem = ({
  variant,
  className,
  follow,
  library,
  player,
  select,
  page,
  list,
  song,
}: SongItemGeneric) => {
  const { playing } = useHowlerContext()
  const { playerState } = usePlayer()
  const { push } = useRouter();
  const { isSongWidgetVisible, handleToggleSongWidget } = useSongWidget();

  const {
    created_by_list,
    created_by_main
  } = {
    created_by_list: getRelativeTime(song?.created_at || ''),
    created_by_main: getRelativeTime(list?.created_at || '')
  };

  const { onPlay } = usePlay({
    song: song,
    songs: list.data ? list.data : playerState.ids
  });

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
    if (follow || page) {
      onPlay();
    }
  }, [follow, page, onPlay])

  return (
    <div
      onClick={handleClickLibrary}
      onDoubleClick={handleClickFollowed}
      className={songItemVariants(({
        variant,
        className
      }))}
    >
      <div className={`flex items-center gap-x-2 overflow-hidden
      ${(library || player || select) ? 'w-full' : 'w-1/2'}`}>
        {!(library || player || select) && (
          <SongPlayingAttribute
            song={song}
            handlePlay={handleClickFollowed}
            list_id={String(list.id)}
          />
        )}
        <SongImageItem
          song={song}
          variant={
            follow ? "follow" :
              player ? "player" :
                library ? "library" :
                  select ? "select" :
                    undefined
          }>
          {player && (
            isSongWidgetVisible ? (
              <UserTips action="Cкрыть">
                <IoMdArrowDropdown
                  onClick={handleToggleSongWidget}
                  className="z-50 absolute border-none group-hover:opacity-100 opacity-0 
                  top-1 right-0 w-[24px] h-[24px] bg-black/60 backdrop-blur backdrop-filter 
                  rounded-full hover:scale-[1.16]"
                />
              </UserTips>
            ) : (
              <UserTips action="Показать">
                <IoMdArrowDropup
                  onClick={handleToggleSongWidget}
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
            className={`${(library
              && playing
              && playerState?.active?.id === song.id) && '!text-jade-500'}`}
          />
          {variant !== "artist_library" && (
            <SongArtist
              variant={player ? "player" : "default"}
              player={player}
              song={song}
            />
          )}
        </div>
        {(library && playing && playerState?.active?.id === song.id) && (
          <div className="w-[24px] h-[24px] ml-4">
            <AiFillSound size={18} className="text-jade-500" />
          </div>
        )}
      </div>
      {!(library || player || select) && (
        <div className={`flex items-center h-full ${(library || player) ? 'w-full' : 'w-2/3'} justify-between`}>
          {variant !== 'artist_library' && (
            <>
              <div className="flex justify-between items-center h-full">
                <div className="w-[190px] overflow-hidden">
                  <SongAlbum album={song.album || song.title} />
                </div>
              </div>
              <div className="w-[130px] overflow-hidden">
                {(created_by_list && follow)
                  ? <SongTimestamp date={created_by_main} />
                  : <SongTimestamp date={created_by_list} />
                }
              </div>
            </>
          )}
          <div className="overflow-hidden min-w-[100px] flex items-center justify-between w-[110px] gap-x-4">
            <div className="group-hover:opacity-100 opacity-0">
              <FollowButton songId={song.id} />
            </div>
            <div className="flex items-center justify-between gap-x-2 pr-4">
              <SongDuration duration='0:00' />
              <SongToolsBar />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}