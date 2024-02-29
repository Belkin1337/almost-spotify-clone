"use client";

import uniqid from "uniqid";
import { createClient } from "@/lib/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../ui/use-toast";
import { useScopedI18n } from "@/locales/client";
import { useUser } from "../user/auth/use-user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SongAttributes } from "@/types/song";
import { useDialog } from "../../ui/use-dialog";

const supabase = createClient();

export default function useCreateSong() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { data: user } = useUser();
  const { closeDialog } = useDialog()
  const uniqueID = uniqid();
  const router = useRouter();
  const uploadModalLocale = useScopedI18n("main-service.main-part.config");

  const uploadSongFile = useMutation({
    mutationFn: async (values: SongAttributes) => {
      try {
        const { data: songData, error: songErr } = await supabase.storage
          .from("songs")
          .upload(`song-${values.title}-${uniqueID}`, values.song, {
            upsert: true,
            contentType: "fileBody"
          });

        if (songErr) {
          toast({
            title: uploadModalLocale("error.something-error"),
            description: songErr.message,
          });
        }

        return songData;
      } catch (error) {
        toast({
          title:
            "Что-то пошло не так при загрузке файла трека: " + String(error),
        });
      }
    },
  });

  const uploadSongImage = useMutation({
    mutationFn: async (values: SongAttributes) => {
      try {
        const { data: imageData, error: imageErr } = await supabase.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, values.image, {
            upsert: true,
            contentType: "fileBody"
          });

        if (imageErr) {
          toast({
            title: uploadModalLocale("error.song-image-error"),
            description: imageErr.message,
          });
        }
        return imageData;
      } catch (error) {
        toast({
          title:
            "Что-то пошло не так при загрузке файла обложки: " + String(error),
        });
      }
    },
  });

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
        
        setIsLoading(true);

        const { error: supabaseErr } = await supabase
          .from("songs")
          .insert({
            user_id: user?.id,
            title: values.title,
            author: values.author,
            album: values.album ? values.album : values.title,
            genre: values.genre,
            image_path: imageData?.path,
            song_path: songData?.path,
          });

        if (supabaseErr) {
          toast({
            title: String(supabaseErr),
          });
        } else {
          setIsLoading(false);
          toast({
            title: uploadModalLocale("publishing.success"),
          });
          
          closeDialog()
          router.refresh();
        }
      } catch (error) {
        setIsLoading(false);
        toast({
          title: "Данные не были загружены. Пожалуйста, попробуйте еще раз."
        });
      }
    },
  });

  return {
    isLoading,
    uploadSong,
  };
}
