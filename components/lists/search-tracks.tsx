"use client"

import { SongItem } from "@/components/song/song-item";
import { createClient } from "@/lib/utils/supabase/client";
import { getSongsByTitle } from "@/lib/queries/get-songs-by-title";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getSongsAll } from "@/lib/queries/get-songs";
import { SongListTableHead } from "@/ui/song-list-table-head";
import { SongEntity } from "@/types/entities/song";

const supabase = createClient();

export const SearchContent = ({
  title
}: {
  title: string
}) => {

  const { data: searchedSongs } = useQuery<SongEntity[]>(getSongsByTitle(supabase, title), {
    enabled: !!title
  })
  const { data: allSongs } = useQuery<SongEntity[]>(getSongsAll(supabase));

  return (
    <>
      <SongListTableHead />
      <div className="flex flex-col gap-y-2 w-full p-6">
        {title ? (
          searchedSongs ? (
            searchedSongs.map((song) => (
              <div key={song.id} className="flex items-center gap-x-4 w-full">
                <div className="flex-1">
                  <SongItem
                    list={{
                      data: searchedSongs
                    }}
                    song={song}
                  />
                </div>
              </div>
            ))) : (
            <div className="flex flex-col gap-y-2 w-full px-4 text-neutral-400">
              Ничего не найдено.
            </div>
          )) : (
          allSongs ? (
            allSongs.map((song) => (
              <div key={song.id} className="flex items-center gap-x-4 w-full">
                <div className="flex-1">
                  <SongItem
                    list={{
                      data: searchedSongs!
                    }}
                    song={song}
                  />
                </div>
              </div>
            ))) : (
            <div className="flex flex-col gap-y-2 w-full px-4 text-neutral-400">
              Ничего не найдено.
            </div>
          ))}
      </div>
    </>
  );
}