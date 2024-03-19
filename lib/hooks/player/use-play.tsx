
"use client"

import { usePlayer } from "@/lib/hooks/player/use-player"
import { useUser } from "../actions/user/auth/use-user";
import { useDialog } from "../ui/use-dialog";
import { AuthForm } from "@/components/forms/auth";
import { SongEntity } from "@/types/entities/song";

export const usePlay = ({ 
  song, 
  songs 
}: { 
  song: SongEntity, 
  songs: SongEntity[] 
}) => {
  const { setActiveId } = usePlayer();
  const { openDialog } = useDialog();
  const { data: user, error } = useUser();

  const onPlay = () => {
    if (!user) {
      openDialog({
        title: "Войдите в аккаунт",
        dialogChildren: <AuthForm />
      })
    }

    if (!error && user) {
      setActiveId(song, songs);
    }
  }

  return {
    onPlay
  }
}