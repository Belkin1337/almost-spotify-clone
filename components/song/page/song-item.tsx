"use client"

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/ui/dialog";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import Image from "next/image";
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
import { getColorSampling } from "@/lib/tools/image-color-sampling";
import { SongEntity } from "@/types/entities/song";

export const SongItemPage = ({ songId }: { songId: string }) => {
  const [imgColor, setImgColor] = useState<string>('');
  const supabase = createClient()
  const { data: song, isError } = useQuery<SongEntity>(getSongById(supabase, songId), {
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })
  const { playerState } = usePlayer()
  const { onPlay } = usePlay();
  const imageUrl = useLoadImage(song!);

  useEffect(() => {
    const fetchImageColor = async () => {
      const { output } = await getColorSampling(imageUrl || "/images/liked.png")
      
      setImgColor(output);
    };

    fetchImageColor();
  }, [imageUrl])

  if (!song || isError) {
    return null;
  }

  return (
    <>
      <div className="overflow-hidden relative w-full h-[324px] p-6 bg-no-repeat bg-cover bg-center" style={{ backgroundColor: imgColor }}>
        <div className="relative z-20 flex gap-x-6 justify-start h-full items-end">
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
              <Image
                src={imageUrl || "/images/liked.png"}
                width={660}
                height={660}
                loading="lazy"
                alt={song?.title || "Song"}
                className="w-full h-full"
              />
            </DialogContent>
          </Dialog>
          <div className="flex flex-col gap-y-2 self-end">
            <SongType type="Сингл" />
            <SongTitle variant="page" data={song} />
            <div className="flex items-center gap-x-2">
              <SongAuthor data={song} />
              <SongTimestamp date="2024" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-8 px-6 py-4">
        <Button
          onClick={() => onPlay({ 
            songId: song.id, 
            songs: playerState.ids || [] 
          })}
          variant="page_play"
          size="lg"
          rounded="large"
        >
          <FaPlay className="text-black" />
        </Button>
        <div className="flex items-center gap-x-2">
          {/* <Button
            onClick={() => onPlay({ songId: song.id, songs: playerState.ids || [] })}
            className="h-[46px] w-[46px] transition rounded-full items-center border border-neutral-600 flex p-4 hover:scale-105"
          >
            <Plus className="text-neutral-400" />
          </Button> */}
        </div>
      </div>
      <SongListTableHead />
      <div className="p-6">
        <SongItem
          follow
          array_data={playerState.ids || []}
          onClicked={() => onPlay({
            songId: song.id,
            songs: playerState.ids || []
          })}
          data={song}
        />
      </div>
    </>
  )
}