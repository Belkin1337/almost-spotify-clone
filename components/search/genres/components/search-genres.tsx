"use client"

import { Typography } from "@/ui/typography"
import { SearchGenresList } from "@/components/search/genres/components/list/search-genres-list";
import { useGenresQuery } from "@/lib/query/genre/genres-query";

export const SearchGenres = () => {
  const { data: genres } = useGenresQuery();

  if (!genres?.length) return;

  return (
    <div className="flex flex-col gap-y-4 w-full py-6">
      <Typography className="text-3xl" font="bold">
        Поиск по жанрам
      </Typography>
      <SearchGenresList genres={genres}/>
    </div>
  )
}