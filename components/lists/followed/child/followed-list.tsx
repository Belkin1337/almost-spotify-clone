"use client"

import { SongItem } from "@/components/song/song-item";
import { useScopedI18n } from "@/locales/client";
import { Typography } from "@/ui/typography";
import { ToolsBar } from "./followed-tools-bar";
import { SongListTableHead } from "@/ui/song-list-table-head";
import { SongEntity } from "@/types/entities/song";

export const FollowedList = ({
  list
}: {
  list: SongEntity[]
}) => {
  const likedLocale = useScopedI18n('main-service.pages.liked-content');

  const randomFollowedSong = Math.floor(Math.random() * list.length);

  return (
    <div className="bg-black/20 backdrop-filter backdrop-blur-md min-h-screen h-full">
      {list.length !== 0 ? (
        <>
          <ToolsBar 
            song={list[randomFollowedSong]}
            list={list}
            variant="followed"
          />
          <SongListTableHead />
          <div className="flex flex-col gap-y-2 w-full p-6">
            {list.map((song, idx) => (
              <div key={idx} className="flex items-center w-full">
                <div className="flex-1">
                  <SongItem
                    type="follow"
                    song={song}
                    list={{
                      id: String(idx + 1),
                      created_at: song.created_at_by_list || '1',
                      data: list
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="p-6">
          <Typography className="text-3xl">
            {likedLocale('navbar.is-not-liked-songs')}
          </Typography>
        </div>
      )}
    </div>
  )
}