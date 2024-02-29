
"use client"

import { usePlayer } from "@/lib/hooks/player/use-player"
import { useUser } from "../actions/user/auth/use-user";
import { useDialog } from "../ui/use-dialog";
import { AuthForm } from "@/components/forms/auth";
import { SongEntity } from "@/types/entities/song";

export const usePlay = () => {
  const { setActiveId, playerState } = usePlayer();
  const { openDialog } = useDialog();
  const { data: user, error } = useUser();

  const onPlay = ({ 
    songId, 
    songs 
  }: { 
    songId: string, 
    songs: SongEntity[] 
  }) => {
    if (!user) {
      openDialog({
        title: "Войдите в аккаунт",
        dialogChildren: <AuthForm />
      })
    }

    if (!error && user) {
      console.log(songId, songs, playerState.activeId)
      setActiveId(songId, songs);
    }
  }

  return {
    onPlay
  }
}