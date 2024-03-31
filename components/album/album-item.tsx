"use client"

import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { getAlbumById } from "@/lib/queries/album/get-album-by-id";
import { createClient } from "@/lib/utils/supabase/client"
import { ColoredBackground } from "@/ui/colored-background"
import { SongItemPageActions } from "../song/page/child/song-actions";
import { SongListTableHead } from "@/ui/song-list-table-head";
import { SongEntity } from "@/types/entities/song";
import { SongItem } from "../song/song-item";
import { Typography } from "@/ui/typography";
import { ArtistPlaylistCard } from "../artist/card/playlist/artist-playlist-card";
import { getSongsById } from "@/lib/queries/song/get-songs-by-id";
import { useQuery } from "@tanstack/react-query";
import { AlbumImageItem } from "./child/album-image-item";
import { AlbumItemPagePreview } from "./child/album-item-preview";
import { AlbumArtist } from "./child/album-artist";

const supabase = createClient();

export const AlbumPageItem = ({
  albumId
}: {
  albumId: string
}) => {
  const { data: album, isError } = useQuery({
    queryKey: [albumId],
    queryFn: async () => {
      return getAlbumById(supabase, albumId);
    },
    enabled: !!albumId,
    retry: 1
  });

  const { data: songs, isError: songError } = useQuery<SongEntity[]>({
    queryKey: [album?.songs],
    queryFn: () => {
      return getSongsById(supabase, album?.songs!)
    },
    enabled: !!album?.songs,
    retry: 1
  })

  const imageUrl = useLoadImage(album?.image_url!);

  if (!album || isError || songError || !songs) return null;

  return (
    <div className="w-full">
      <ColoredBackground imageUrl={imageUrl!} />
      <div className="flex flex-col relative">
        <div className="z-20 p-6 flex gap-x-6 justify-start h-full items-end">
          <AlbumImageItem
            album={album}
          />
          <AlbumItemPagePreview album={album} type="album" />
        </div>
        <SongItemPageActions song={songs[0]} />
        <div className="flex flex-col bg-black/20 backdrop-filter backdrop-blur-md">
          <SongListTableHead />
          <div className="p-6">
            {songs?.map((song) => (
              <SongItem
                key={song.id}
                song={song}
                list={{
                  id: '1',
                }}
              />
            ))}
          </div>
          <div className="flex flex-col max-w-[340px] overflow-hidden p-6">
            <Typography className="text-neutral-400 text-sm">
              March 16, 2024
            </Typography>
            <Typography className="text-neutral-400 text-[12px]">
              @ {new Date().getFullYear()}
            </Typography>
          </div>
          <div className="flex flex-col p-6 w-full">
            <div className="flex items-center gap-2">
              <Typography className="text-2xl text-white !font-bold">
                More by
              </Typography>
              <AlbumArtist variant="album" album={album} />
            </div>
            <div className="flex items-center gap-x-4 overflow-hidden">
              <ArtistPlaylistCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}