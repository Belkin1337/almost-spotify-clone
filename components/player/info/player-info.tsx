"use client"

import { FollowButton } from "@/components/song/child/song-follow-button"
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
    <div className="flex items-center gap-x-4 w-[30%] overflow-hidden">
      <SongItem
        variant="player"
        player
        song={song}
        list={{
          data: list
        }}
      />
      <FollowButton songId={song?.id!} />
    </div>
  )
}