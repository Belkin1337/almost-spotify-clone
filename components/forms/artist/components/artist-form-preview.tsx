import { PreviewArtistCard } from "@/components/preview/artist/artist-card"
import { PreviewCard } from "@/ui/preview-card"
import { PreviewArtistType } from "@/types/form";

type ArtistFormPreviewProps = {
  preview: PreviewArtistType
}

export const ArtistFormPreview = ({
  preview
}: ArtistFormPreviewProps) => {
  return (
    <PreviewCard>
      <PreviewArtistCard preview={preview} />
    </PreviewCard>
  )
}