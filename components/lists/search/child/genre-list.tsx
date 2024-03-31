import { genresList } from "@/lib/constants/genres-list"
import { Typography } from "@/ui/typography"
import Image from "next/image"

export const SearchGenreList = () => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <Typography className="text-3xl !font-bold">
        Поиск по жанрам
      </Typography>
      <div className="flex flex-wrap overflow-hidden gap-4">
        {genresList.map((genre, idx) => (
          <div
            key={idx}
            className="flex items-start cursor-pointer relative w-[204px] h-[204px] bg-violet-500 overflow-hidden rounded-md p-4"
          >
            <Typography className="!font-bold text-white text-xl">
              {genre.name}
            </Typography>
            <Image
              src={genre.icon}
              alt={genre.name}
              width={126}
              height={126}
              loading="lazy"
              className="absolute -right-4 -bottom-4 rotate-[25deg] shadow-neutral-900 shadow-sm"
            />
          </div>
        ))}
      </div>
    </div>
  )
}