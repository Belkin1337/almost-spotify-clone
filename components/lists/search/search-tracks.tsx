"use client"

import { SongItem } from "@/components/song/song-item";
import { createClient } from "@/lib/utils/supabase/client";
import { getSongsByTitle } from "@/lib/queries/song/get-songs-by-title";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { SongEntity } from "@/types/entities/song";
import { Typography } from "@/ui/typography";
import { useCallback } from "react";
import { SongImageItem } from "@/components/song/child/song-image";
import { SongItemTitle } from "@/components/song/child/song-title";

const supabase = createClient();

const TopResult = ({
  song
}: {
  song: SongEntity
}) => {
  return (
    <div className="flex gap-y-4 flex-col w-full bg-neutral-900 hover:bg-neutral-800 cursor-pointer rounded-md p-4">
      <div className="flex rounded-full w-[100px] overflow-hidden">
        <SongImageItem
          variant="card"
          className="h-[100px] w-[100px]"
          song={song}
        />
      </div>
      <SongItemTitle
        variant="card"
        song={song}
      />
    </div>
  )
}

export const SearchContent = ({
  title
}: {
  title: string
}) => {
  const { data: searchedSongs } = useQuery<SongEntity[]>(getSongsByTitle(supabase, title), {
    enabled: !!title
  })

  const calcMatchSongs = useCallback(() => {
    if (!searchedSongs || searchedSongs.length === 0) return null;

    let bestMatch = searchedSongs[0];
    let minDifference = Math.abs(searchedSongs[0].title.length - title.length);

    for (const song of searchedSongs) {
      const difference = Math.abs(song.title.length - title.length);
      if (difference < minDifference) {
        minDifference = difference;
        bestMatch = song;
      }
    }

    return bestMatch;
  }, [searchedSongs, title]);

  const topResult = calcMatchSongs();

  if (!title) return;

  return (
    <div className="flex w-full h-full gap-x-4 justify-between">
      <div className="flex gap-y-2 flex-col w-1/3">
        <Typography className="text-3xl !font-bold">
          Top result
        </Typography>
        {topResult && (
          <TopResult song={topResult} />
        )}
      </div>
      <div className="flex gap-y-2 flex-col w-2/3">
        <Typography className="text-3xl !font-bold">
          Songs
        </Typography>
        <div className="flex flex-col w-full">
          {searchedSongs ? (
            searchedSongs.map((song, idx) => (
              <div key={song.id} className="flex items-center gap-x-4 w-full">
                <div className="flex-1">
                  <SongItem
                    variant="artist_library"
                    song={song}
                    list={{
                      id: String(idx + 1),
                      data: searchedSongs
                    }}
                  />
                </div>
              </div>
            ))) : (
            <div className="flex flex-col gap-y-2 w-full px-4 text-neutral-400">
              <Typography>
                Ничего не найдено.
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}