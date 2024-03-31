"use client"

import uniqid from "uniqid";
import { useMutation } from "@tanstack/react-query";
import { SongAttributes } from "./use-create-song";
import { useScopedI18n } from "@/locales/client";
import { useToast } from "../../ui/use-toast";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();
const uniqueID = uniqid();

export function useUploadSongFile() {
  const { toast } = useToast();
  const uploadModalLocale = useScopedI18n("main-service.main-part.config");

  const uploadSongFile = useMutation({
    mutationFn: async (values: SongAttributes) => {
      try {
        const { data: songData, error: songErr } = await supabase.storage
          .from("songs")
          .upload(`song-${values.title}-${uniqueID}`, values.song!, {
            upsert: true,
            contentType: "fileBody"
          });

        if (songErr) {
          toast({
            title: uploadModalLocale("error.something-error"),
            description: songErr.message,
          });
        }

        console.log(values.image, values.song, songData, songErr?.message)
        return songData;
      } catch (error) {
        toast({
          title: String(error),
          variant: "red"
        });

      }
    },
  });

  return {
    uploadSongFile
  }
}