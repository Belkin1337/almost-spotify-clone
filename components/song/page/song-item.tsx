"use client"

import { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/ui/dialog";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { FaPlay } from "react-icons/fa";
import { usePlay } from "@/lib/hooks/player/use-play";
import { Button } from "@/ui/button";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { getSongById } from "@/lib/queries/get-song-by-id";
import { usePlayer } from "@/lib/hooks/player/use-player";
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
import { SongFollowButton } from "../child/song-follow-button";
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
  const { playerState } = usePlayer()
  const { onPlay } = usePlay({ song: song!, songs: playerState.ids });

  const handlePlay = useCallback(() => { onPlay() }, [onPlay])

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
                className="w-[224px] rounded-md h-[224px] shadow-lg shadow-black cursor-pointer hover:scale-[0.98] hover:duration-100 duration-100"
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
              <SongAuthor author={song.author} />
              <SongTimestamp date="2024" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-8 px-6 py-4">
          <Button
            onClick={handlePlay}
            variant="page_play"
            size="lg"
            rounded="large"
          >
            <FaPlay className="text-black" />
          </Button>
          <div className="flex items-center gap-x-2">
            <SongFollowButton
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
                data: playerState.ids
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