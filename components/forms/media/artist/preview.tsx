
import { PreviewArtistCard } from "@/components/preview/card/media/artist-card"
import { PreviewCard } from "@/components/preview/card/preview-card"
import {PreviewArtistType} from "@/lib/constants/preview";

export const ArtistFormPreview = ({
  preview
}: {
  preview: PreviewArtistType
}) => {
  return (
    <PreviewCard>
      <PreviewArtistCard preview={preview} />
    </PreviewCard>
  )
}