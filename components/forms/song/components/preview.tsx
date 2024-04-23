import { PreviewSongCard } from "@/components/preview/song/song-card"
import { PreviewCard } from "@/ui/preview-card"
import { PreviewSongType } from "@/types/preview"
import { memo } from "react";

export const SongFormPreview = memo(({
  preview
}: {
  preview: PreviewSongType
}) => {
  return (
    <PreviewCard>
      <PreviewSongCard preview={preview} />
    </PreviewCard>
  )
})

SongFormPreview.displayName === 'SongFormPreview';