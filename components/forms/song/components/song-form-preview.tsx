import { PreviewSongCard } from "@/components/preview/song/song-card"
import { PreviewCard } from "@/ui/preview-card"
import { memo } from "react";

export const SongFormPreview = memo(() => {
  return (
    <PreviewCard>
      <PreviewSongCard />
    </PreviewCard>
  )
})
SongFormPreview.displayName = 'SongFormPreview';