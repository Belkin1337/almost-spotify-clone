import { genresList } from "@/lib/constants/shared/genres-list"
import { Typography } from "@/ui/typography"
import Image from "next/image"

export const SearchGenreList = () => {
  return (
    <div className="flex flex-col gap-y-4 w-full py-6">
      <Typography className="text-3xl" font="bold">
        Поиск по жанрам
      </Typography>
      <div className="flex flex-wrap overflow-hidden gap-6">
        {genresList.map((genre, idx) => (
          <div key={idx} className="flex items-start cursor-pointer relative w-fit min-w-[231.5px] h-[231.5px] bg-violet-500 overflow-hidden rounded-md p-4">
            <Typography text_color="white" size="xl" font="bold">
              {genre.name}
            </Typography>
            {/*<Image*/}
            {/*  src={genre.icon}*/}
            {/*  alt={genre.name}*/}
            {/*  width={126}*/}
            {/*  height={126}*/}
            {/*  loading="lazy"*/}
            {/*  className="absolute -right-4 -bottom-4 rotate-[25deg] shadow-neutral-900 shadow-sm"*/}
            {/*/>*/}
          </div>
        ))}
      </div>
    </div>
  )
}