import { PreviewArtistType } from "@/types/form"
import { Typography } from "@/ui/typography"
import Image from "next/image"
import { IoMdMusicalNote } from "react-icons/io"

export const PreviewArtistCard = ({
  preview
}: {
  preview: PreviewArtistType
}) => {
  return (
    <div className="flex relative bg-neutral-800 border border-neutral-700 bg-cover bg-center w-full gap-x-4 rounded-xl p-4 overflow-hidden"
      style={{ backgroundImage: `url(${preview.cover_image})` }}
    >
      <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/50 w-full h-full" />
      <div className="relative flex justify-center items-center w-[80px] h-[80px] overflow-hidden">
        {preview.avatar ? (
          <Image
            src={preview.avatar}
            alt="Track"
            width={400}
            height={400}
            className="object-cover w-full h-full rounded-full"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center border border-neutral-700 rounded-full overflow-hidden bg-neutral-800 w-full h-full">
            <IoMdMusicalNote size={20} />
          </div>
        )}
      </div>
      <div className="relative flex flex-col gap-y-1 bg-black/10 max-w-[250px]">
        <Typography className="!truncate font-semibold">
          {preview.name || 'Неизвестен'}
        </Typography>
        <Typography className="text-md !text-neutral-400 text-ellipsis truncate font-medium">
          {preview.description || '...'}
        </Typography>
      </div>
    </div>
  )
}