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
import { SongType } from "../child/song-type";
import { SongTitle } from "../child/song-title";
import { SongAuthor } from "../child/song-author";
import { SongTimestamp } from "../child/song-timestamp";
import { SongEntity } from "@/types/entities/song";
import { Typography } from "@/ui/typography";
import { ArtistPlaylistCard } from "@/components/artist/card/playlist/artist-playlist-card";
import { ColoredBackground } from "@/ui/colored-background";
import { FollowButton } from "../child/song-follow-button";
import { PlayButton } from "@/components/buttons/play-button";
import { ShuffleButton } from "@/components/buttons/shuffle-button";
import { FaCircle } from "react-icons/fa";
import Image from "next/image";

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

  if (!song || isError) {
    return null;
  }

  return (
    <div className="w-full">
      <ColoredBackground imageUrl={imageUrl!} />
      <div className="flex flex-col relative">
        <div className="z-20 p-6 flex gap-x-6 justify-start h-full items-end">
          <Dialog>
            <DialogTrigger>
              <Image
                src={imageUrl || "/images/liked.png"}
                width={660}
                height={660}
                loading="lazy"
                alt={song?.title || "Song"}
                className="min-w-[224px] object-cover max-w-[224px] max-h-[224px] rounded-md min-h-[224px] shadow-lg shadow-black cursor-pointer hover:scale-[1.06] hover:duration-100 duration-100"
              />
            </DialogTrigger>
            <DialogContent className="w-[660px] h-[660px] p-0 rounded-lg overflow-hidden">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  width={660}
                  height={660}
                  loading="lazy"
                  alt={song?.title || "Song"}
                  className="w-full h-full"
                />
              )}
            </DialogContent>
          </Dialog>
          <div className="flex flex-col gap-y-2 self-end">
            <SongType
              type="Сингл"
            />
            <SongTitle
              variant="page"
              song={song}
            />
            <div className="flex items-center gap-x-2">
              <SongAuthor author={song.author} className="text-white font-semibold"/>
              <FaCircle size={4} className="fill-white" />
              <SongTimestamp date="2024"/>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-10 px-6 py-4">
          <PlayButton 
            variant="single_page"
            song={song}
          />
          <div className="flex items-center gap-x-4">
            <ShuffleButton />
            <FollowButton
              songId={song.id}
              variant={{
                page: true
              }}
            />
          </div>
        </div>
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
              More with {song.author}
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