"use client"

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from 'react-icons/ai';
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useUser } from "@/hooks/use-user";
import { useUploadModal } from "@/hooks/use-upload-modal";
import { Song } from "@/types";
import LibrarySongItem from "@/components/ui/library-song-item";
import useOnPlay from "@/hooks/use-on-play";
import Image from "next/image";
import { LikedSongsButton } from "../ui/liked-songs-button";

interface LibraryProps {
  songs: Song[];
}

export const Library = ({ songs }: LibraryProps) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const onPlay = useOnPlay(songs);

  const userContext = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Моя медиатека</p>
        </div>
        <AiOutlinePlus
          size={20}
          onClick={userContext}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        <LikedSongsButton/>
        {songs.map((item) => (
          <LibrarySongItem
            isPlayerComponent
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
}
