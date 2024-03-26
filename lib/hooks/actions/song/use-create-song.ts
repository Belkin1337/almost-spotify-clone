"use client";

import uniqid from "uniqid";
import { createClient } from "@/lib/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../ui/use-toast";
import { useScopedI18n } from "@/locales/client";
import { useUser } from "../user/auth/use-user";
import { useRouter } from "next/navigation";
import { song_route } from "@/lib/constants/routes";
import { ArtistEntity } from "@/types/entities/artist";

type SongAttributes = {
  title: string;
  album: number,
  genre: string,
  artists: Array<ArtistEntity>;
  image: any;
  song: any;
};

const supabase = createClient();
const uniqueID = uniqid();

export function useCreateSong() {
  const { toast } = useToast();
  const { refresh } = useRouter();
  const { push } = useRouter()
  const { user } = useUser();

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
          title: String(error),
        });
      }
    },
  });

  const uploadSongImage = useMutation({
    mutationFn: async (values: SongAttributes) => {
      try {
        const {  data: imageData,  error: imageErr } = await supabase.storage
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
          title: String(error),
          variant: "red"
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

        const { error: supabaseErr } = await supabase
          .from("songs")
          .insert({
            user_id: user?.id,
            title: values.title,
            artists: [values.artists],
            // album: values.album,
            genre: values.genre,
            image_path: imageData?.path,
            song_path: songData?.path,
          });

        if (supabaseErr) {
          toast({
            title: supabaseErr.message,
            variant: "red"
          });
        } else {
          toast({
            title: uploadModalLocale("publishing.success"),
            variant: "right"
          });
          
          refresh();
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