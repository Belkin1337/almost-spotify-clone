import { album_route } from "@/lib/constants/routes/routes"
import { Typography } from "@/ui/typography"
import { AlbumEntity } from "@/types/album";
import Link from "next/link";

export const SongAlbum = ({
  album
}: {
  album: AlbumEntity
}) => {
  if (!album) return;

  return (
    <Link href={`${album_route}/${album.id}`}>
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