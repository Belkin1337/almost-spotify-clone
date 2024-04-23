import { PreviewAlbumCard } from "@/components/preview/album/album-card"
import { PreviewCard } from "@/ui/preview-card"
import { PreviewAlbumType } from "@/types/preview"
import { memo } from "react";

export const AlbumFormPreview = memo(({
  preview
}: {
  preview: PreviewAlbumType
}) => {
  return (
    <PreviewCard>
      <PreviewAlbumCard preview={preview} />
    </PreviewCard>
  )
})

AlbumFormPreview.displayName === 'AlbumFormPreview'