"use client"

import { useToast } from "../../ui/use-toast";
import { useUser } from "../user/auth/use-user";
import { useMutation } from "@tanstack/react-query";
import { SongAttributes } from "./use-create-song";
import { createClient } from "@/lib/utils/supabase/client";
import { SongEntity } from "@/types/entities/song";
import { useUploadSongImage } from "./use-upload-song-image";

const supabase = createClient();

export function useEditSong() {
  const { toast } = useToast();
  const { user } = useUser();
  const { uploadSongImage } = useUploadSongImage();

  const editSong = useMutation({
    mutationFn: async (values: SongAttributes) => {
      try {
        const [imageData] = await Promise.all([
          uploadSongImage.mutateAsync(values),
        ]);

        if (imageData === null) {
          throw new Error("Ошибка загрузки файла");
        }

        const { data: newSong, error: supabaseErr } = await supabase
          .from("songs")
          .update({
            user_id: user?.id,
            title: values.title,
            artists: values.artists,
            album: values.album,
            genre: values.genre,
            image_path: imageData?.path
          })
          .eq("id", values.id)
          .select()

        if (supabaseErr) {
          return;
        } else if (newSong && !supabaseErr) {
          return newSong as SongEntity[]
        }
      } catch (e) {
        toast({
          title: String(e),
          variant: "red"
        });
      }
    },
  });

  return {
    editSong
  };
}