import { album_route } from "@/lib/constants/routes/routes"
import { Typography } from "@/ui/typography"
import { AlbumEntity } from "@/types/album";
import Link from "next/link";
import { Skeleton } from "@/ui/skeleton";

export const SongAlbum = ({
  album,
  isLoading
}: {
  album: AlbumEntity,
  isLoading: boolean
}) => {
  if (!album) return;

  if (isLoading) return <Skeleton className="rounded-md h-[22px] w-[64px]"/>

  return (
    <Link href={album_route(album.id)}>
      <Typography
        text_color="gray"
        font="medium"
        size="small"
        className="truncate hover:underline text-sm font-normal cursor-pointer"
      >
        {album.title}
      </Typography>
    </Link>
  )
}