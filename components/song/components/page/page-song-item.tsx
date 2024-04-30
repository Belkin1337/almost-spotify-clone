"use client"

import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { SongItem } from "../../song-item/song-item";
import { SongListTableHead } from "@/ui/song-list-table-head";
import { Typography } from "@/ui/typography";
import { ColoredBackground } from "@/ui/colored-background";
import { PageSongPreview } from "./components/page-song-preview";
import { SongToolsBar } from "../../child/song-tools-bar/components/song-tools-bar";
import { SongImageItem } from "../../child/song-image/components/song-image";
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";
import { useSongQuery } from "@/lib/query/song/song-query";
import { useArtistQuery } from "@/lib/query/artist/artist-query";
import dynamic from "next/dynamic";

const PageSongMore = dynamic(() => import("@/components/song/components/page/components/page-song-more")
  .then(mod => mod.PageSongMore))

export const SongItemPage = ({
  songId
}: {
  songId: string
}) => {
  const { data, isLoading, isError } = useSongQuery(songId);
  const song = data?.data;

  const { data: songArtists } = useSongArtistListQuery(song?.id!);
  const { data: artist } = useArtistQuery(songArtists?.firstArtist.id!)
  const { data: image } = useLoadImage(song?.image_path!)

  if (!song || !artist || isError) return null;

  return (
    <>
      <ColoredBackground imageUrl={image?.url!} />
      <div className="flex flex-col relative">
        <div className="z-20 p-6 flex gap-x-6 justify-start h-full items-end">
          <SongImageItem variant="page" song={song}/>
          <PageSongPreview type="song" song={song} />
        </div>
        <div className="flex flex-col bg-black/20 backdrop-filter backdrop-blur-md">
          <SongToolsBar song={song} />
          <SongListTableHead />
          <div className="p-6">
            <SongItem
              type="page"
              song={song}
              song_list={{ id: '1', }}
              queryOptions={{ isLoading: isLoading }}
            />
          </div>
          <div className="flex flex-col max-w-[340px] overflow-hidden py-6 px-8">
            <Typography size="small" text_color="gray">
              March 16, 2024
            </Typography>
            <Typography className="text-[12px]" text_color="gray">
              @ {new Date().getFullYear()}
            </Typography>
          </div>
          <PageSongMore artist={artist} songId={songId}/>
        </div>
      </div>
    </>
  )
}