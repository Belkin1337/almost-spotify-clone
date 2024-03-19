"use client"

import { SongFollowButton } from "@/components/song/child/song-follow-button"
import { SongItem } from "@/components/song/song-item"
import { SongEntity } from "@/types/entities/song"

interface PlayerSongInfoProps {
  list: SongEntity[],
  song: SongEntity
}

export const PlayerSongInfo = ({
  song,
  list
}: PlayerSongInfoProps) => {
  return (
    <div className="flex items-center gap-x-4 max-w-[284px] overflow-hidden justify-start">
      <SongItem
        variant="player"
        player
        song={song}
        list={{
          data: list
        }}
      />
      <SongFollowButton songId={song?.id!} />
    </div>
  )
}