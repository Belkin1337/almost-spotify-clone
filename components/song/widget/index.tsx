"use client"

import { usePlayer } from "@/lib/hooks/player/use-player";
import { UserGeneric } from "@/types/entities/user";
import { ArtistWidgetCard } from "../../artist/card/info/artist-widget-info";
import { WidgetSongItem } from "./child/widget-song-item";
import { HeightPlayerState } from "@/lib/constants/ui";
import { Wrapper } from "@/ui/wrapper";

export const SongWidget = ({
  user
}: {
  user: UserGeneric
}) => {
  const { playerState } = usePlayer();

  const activePlayer = HeightPlayerState();
  const activeSong = playerState.active;

  if (!user || !activeSong) return;

  return (
    <Wrapper variant="widget" className={activePlayer}>
      <div className="p-4 flex flex-col gap-y-4 w-full">
        <WidgetSongItem song={activeSong} />
        <ArtistWidgetCard song={activeSong} />
      </div>
    </Wrapper>
  )
}