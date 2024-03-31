"use client";

import { createClient } from "@/lib/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../ui/use-toast";
import { useUser } from "../user/auth/use-user";
import { SongEntity } from "@/types/entities/song";
import { useUploadSongImage } from "./use-upload-song-image";
import { useUploadSongFile } from "./use-upload-song-file";

export type SongAttributes = {
  id?: string,
  title: string;
  album?: string,
  genre: string,
  artists: Array<string>;
  image: File | undefined;
  song?: File | undefined;
};

const supabase = createClient();

export function useCreateSong() {
  const { toast } = useToast();
  const { user } = useUser();
  const { uploadSongImage } = useUploadSongImage();
  const { uploadSongFile } = useUploadSongFile();

  const uploadSong = useMutation({
    mutationFn: async (values: SongAttributes) => {
      try {
        const [songData, imageData] = await Promise.all([
          uploadSongFile.mutateAsync(values),
          uploadSongImage.mutateAsync(values),
        ]);

        if (songData === null || imageData === null) {
          throw new Error("Ошибка загрузки файла");
        }

        const { data: newSong, error: supabaseErr } = await supabase
          .from("songs")
          .insert({
            user_id: user?.id,
            title: values.title,
            artists: values.artists,
            genre: values.genre,
            image_path: imageData?.path,
            song_path: songData?.path,
          })
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
    uploadSong,
  };
}