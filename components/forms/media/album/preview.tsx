import { PreviewAlbumCard } from "@/components/preview/card/media/album-card"
import { PreviewCard } from "@/components/preview/card/preview-card"
import { PreviewAlbumType } from "@/lib/constants/preview"

export const AlbumFormPreview = ({
  preview
}: {
  preview: PreviewAlbumType
}) => {
  return (
    <PreviewCard>
      <PreviewAlbumCard preview={preview} />
    </PreviewCard>
  )
}