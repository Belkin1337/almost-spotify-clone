"use client"

import { useRouter } from "next/navigation";
import { useScopedI18n } from "@/locales/client";
import { TbPlaylist } from "react-icons/tb";
import { WidgetPreview } from "../widgets/brand/widget-preview";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { AuthForm } from "../forms/auth";
import { getSongsByUserId } from "@/lib/queries/get-songs-by-userId";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { SongItem } from "../song/song-item";
import { Typography } from "@/ui/typography";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

const supabase = createClient();

export const Library = ({ user }: { user: User }) => {
  const { openDialog } = useDialog();
  const { push } = useRouter();
  const { data: songs } = useQuery<SongEntity[]>(getSongsByUserId(supabase, user?.id!));

  const libraryLocale = useScopedI18n('main-service.sidebar.widgets')
  const likedSongButtonLocale = useScopedI18n('main-service.main-part.config')

  return (
    <div className="flex flex-col bg-DARK_SECONDARY_BACKGROUND overflow-y-auto rounded-md">
      {!user && (
        <WidgetPreview title="Начни наслаждаться музыкой прямо сейчас!">
          <Typography onClick={() => openDialog({
            title: "Войдите в аккаунт",
            dialogChildren: <AuthForm />
          })} variant="link">
            Слушать
          </Typography>
        </WidgetPreview>
      )}
      {user && (
        <div className="flex px-4 pt-4 items-center justify-between">
          <div className="inline-flex items-center gap-x-2">
            <TbPlaylist className="text-neutral-400" size={26} />
            <Typography variant="secondary">
              {libraryLocale('media-library')}
            </Typography>
          </div>
        </div>
      )}
      {user && (
        <div className={`flex px-2 flex-col pb-4 gap-y-2 mt-4 overflow-x-hidden`}>
          <div onClick={() => push('/home/collection/tracks')} className="flex flex-col p-2 md:flex-row items-center gap-x-2 cursor-pointer hover:bg-neutral-800/50 rounded-md">
            <Image
              src="/images/liked.png"
              alt="Playlist"
              loading="lazy"
              width={48}
              height={48}
              className="relative rounded-md h-[48px] w-[48px] object-cover"
            />
            <div className="flex flex-col mt-4 md:mt-0">
              <Typography size="md">
                {likedSongButtonLocale('liked-tracks-widget')}
              </Typography>
              <Typography variant="secondary">
                {likedSongButtonLocale('song-attributes.song-playlist')}
              </Typography>
            </div>
          </div>
          {songs?.map((item) => (
            <SongItem
              key={item.id}
              variant="library"
              library
              array_data={songs}
              data={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}