import { PreviewSongCard } from "@/components/preview/card/media/song-card"
import { PreviewCard } from "@/components/preview/card/preview-card"
import { PreviewSongType } from "@/lib/constants/preview"

export const SongFormPreview = ({
  preview
}: {
  preview: PreviewSongType
}) => {
  return (
    <PreviewCard>
      <PreviewSongCard preview={preview} />
    </PreviewCard>
  )
}