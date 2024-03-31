
"use client"

import { usePlayer } from "@/lib/hooks/player/use-player"
import { useUser } from "../../actions/user/auth/use-user";
import { useDialog } from "../../ui/use-dialog";
import { AuthForm } from "@/components/forms/auth";
import { SongEntity } from "@/types/entities/song";
import { useCallback } from "react";

export const usePlay = ({ 
  song, 
  songs 
}: { 
  song: SongEntity, 
  songs: SongEntity[] 
}) => {
  const { setActiveId } = usePlayer();
  const { openDialog } = useDialog();
  const { user } = useUser();

  const onPlay = useCallback(() => {
    if (!user) {
      openDialog({
        dialogChildren: <AuthForm />
      })
    } else {
      setActiveId(song, songs);
    }
  }, [user, setActiveId, song, openDialog, songs])

  return {
    onPlay
  }
}