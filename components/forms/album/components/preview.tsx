import { PreviewAlbumCard } from "@/components/preview/album/album-card"
import { PreviewCard } from "@/ui/preview-card"
import { PreviewAlbumType } from "@/types/form"

type AlbumFormPreviewProps = {
  preview: PreviewAlbumType
}

export const AlbumFormPreview = ({
  preview
}: AlbumFormPreviewProps) => {
  return (
    <PreviewCard>
      <PreviewAlbumCard preview={preview} />
    </PreviewCard>
  )
}