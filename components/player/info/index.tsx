"use client"

import { FollowTrackButton } from "@/components/buttons/follow/follow-button"
import { SongItem } from "@/components/song/song-item"
import { SongEntity } from "@/types/entities/song"

interface PlayerSongInfoGeneric {
  songArr: SongEntity[],
  song: SongEntity
}

export const PlayerSongInfo = ({
  song,
  songArr
}: PlayerSongInfoGeneric) => {
  return (
    <div className="flex w-1/6 justify-start">
      <div className="flex items-center gap-x-4">
        <SongItem
          variant="player"
          player
          array_data={songArr}
          data={song}
        />
        <FollowTrackButton songId={song?.id} />
      </div>
    </div>
  )
}