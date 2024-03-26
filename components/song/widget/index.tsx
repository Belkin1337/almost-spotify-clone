"use client"

import { ResizablePanel } from "@/ui/resizable";
import { usePlayer } from "@/lib/hooks/player/use-player";
import { UserGeneric } from "@/types/entities/user";
import { useSongWidget } from "@/lib/hooks/actions/song/use-song-widget";
import { ArtistWidgetCard } from "../../artist/card/info/artist-widget-info";
import { WidgetSongItem } from "./child/widget-song-item";

export const SongWidget = ({
  user
}: {
  user: UserGeneric
}) => {
  const { isSongWidgetVisible } = useSongWidget()
  const { playerState } = usePlayer();
  
  const activeSong = playerState.active;

  if (!user || !activeSong) {
    return null
  }

  if (!isSongWidgetVisible || !activeSong) return;

  return (
    <ResizablePanel
      defaultSize={462}
      className="hidden md:block md:max-w-[462px] md:w-[462px] md:min-w-[342px] p-1"
    >
      <div className={`bg-DARK_SECONDARY_BACKGROUND overflow-y-auto p-4 rounded-md 
      ${activeSong ? 'h-[calc(100%-84px)]' : 'h-full'}`}>
        <div className="flex flex-col gap-y-4 w-full">
          <WidgetSongItem song={activeSong} />
          <ArtistWidgetCard song={activeSong} />
        </div>
      </div>
    </ResizablePanel >
  )
}