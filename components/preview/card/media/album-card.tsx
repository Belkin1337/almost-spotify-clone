
import { PreviewAlbumType } from "@/lib/constants/preview"
import { Typography } from "@/ui/typography"
import Image from "next/image"
import { IoMdMusicalNote } from "react-icons/io"

export const PreviewAlbumCard = ({
  preview
}: {
  preview: PreviewAlbumType
}) => {
  return (
    <>
      <div className="flex justify-center items-center w-[240px] h-[240px] bg-neutral-800 rounded-xl overflow-hidden">
        {preview.image ? (
          <Image
            src={preview.image}
            alt="Track"
            width={400}
            height={400}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <IoMdMusicalNote size={42} />
        )}
      </div>
      <div className="flex flex-col gap-y-2 max-w-[250px]">
        <Typography className="truncate">
          {preview?.title || 'Без названия'}
        </Typography>
        <Typography className="text-md !text-neutral-400 truncate">
          {preview?.artists!.map(item => item.name) || 'Неизвестен'}
        </Typography>
      </div>
    </>
  )
}