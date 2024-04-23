import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { usePlay } from "@/lib/hooks/player/use-play";
import { SongEntity } from "@/types/song";
import { ReactNode } from "react";
import { SongPlayButton } from "@/components/song/child/song-play-button/components/song-play-button";
import Image from "next/image";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { SongArtist } from "@/components/song/child/song-artist/song-artist";
import { SongItemTitle } from "@/components/song/child/song-title/components/song-title";

export const SongItemMain = ({
  song,
  children
}: {
  song: SongEntity,
  children?: ReactNode
}) => {
  const { playerAttributes } = usePlayerStateQuery()
  const { onPlay } = usePlay()

  const handlePlay = async () => {
    await onPlay({
      song: song,
      songs: playerAttributes?.ids || []
    })
  }

  const { data: image } = useLoadImage(song?.image_path);

  return (
    <div onDoubleClick={handlePlay}
      className="flex flex-col justify-center relative group rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer 
    hover:bg-neutral-400/20 focus-within:bg-neutral-400/20 focus-within:ring-1 focus-within:ring-jade-400 transition p-2">
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={image?.url || "/images/liked.png"}
          fill
          alt={song.title}
        />
      </div>
      <div className="flex flex-col items-start w-full gap-y-1 py-2">
        <SongItemTitle song={song} />
        <SongArtist
          song={song} 
        />
      </div>
      <div className="absolute bottom-24 right-5">
        <SongPlayButton
          variant="single_medium"
          song={song}
        />
      </div>
      {children}
    </div>
  );
}