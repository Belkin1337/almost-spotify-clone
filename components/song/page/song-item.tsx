"use client"

import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/ui/dialog";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { getSongById } from "@/lib/queries/get-song-by-id";
import { SongItem } from "../song-item";
import { SongListTableHead } from "@/ui/song-list-table-head";
import { SongEntity } from "@/types/entities/song";
import { Typography } from "@/ui/typography";
import { ArtistPlaylistCard } from "@/components/artist/card/playlist/artist-playlist-card";
import { ColoredBackground } from "@/ui/colored-background";
import { FollowButton } from "../child/song-follow-button";
import { PlayButton } from "@/components/buttons/play-button";
import { ShuffleButton } from "@/components/buttons/shuffle-button";
import Image from "next/image";
import { SongItemPagePreview } from "./child/song-preview";
import { SongItemPageActions } from "./child/song-actions";
import { SongImageItem } from "../child/song-image";

const supabase = createClient();

export const SongItemPage = ({
  songId
}: {
  songId: string
}) => {
  const { data: song, isError } = useQuery<SongEntity>(getSongById(supabase, songId), {
    enabled: !!songId,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  const imageUrl = useLoadImage(song?.image_path!);

  if (!song || isError) return null;

  return (
    <div className="w-full">
      <ColoredBackground imageUrl={imageUrl!} />
      <div className="flex flex-col relative">
        <div className="z-20 p-6 flex gap-x-6 justify-start h-full items-end">
          <SongImageItem
            variant="page"
            song={song}
          />
          <SongItemPagePreview song={song} />
        </div>
        <SongItemPageActions song={song} />
        <div className="flex flex-col bg-black/20 backdrop-filter backdrop-blur-md">
          <SongListTableHead />
          <div className="p-6">
            <SongItem
              song={song}
              list={{
                id: '1',
              }}
            />
          </div>
          <div className="flex flex-col max-w-[340px] overflow-hidden p-6">
            <Typography className="text-neutral-400 text-sm">
              March 16, 2024
            </Typography>
            <Typography className="text-neutral-400 text-[12px]">
              @ {new Date().getFullYear()}
            </Typography>
          </div>
          <div className="flex flex-col p-6 w-full">
            <Typography className="text-2xl text-white !font-bold">
              {/* More with {song?.artists.map(item => item.name).join(', ')} */}
            </Typography>
            <div className="flex items-center gap-x-4 overflow-hidden">
              <ArtistPlaylistCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}