"use client"

import uniqid from "uniqid";
import { createClient } from "@/lib/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useScopedI18n } from "@/locales/client";
import { SongAttributes } from "./use-create-song";
import { useToast } from "../../ui/use-toast";

const supabase = createClient();
const uniqueID = uniqid();

export function useUploadSongImage() {
  const { toast } = useToast();
  const uploadModalLocale = useScopedI18n("main-service.main-part.config");

  const uploadSongImage = useMutation({
    mutationFn: async (values: SongAttributes) => {
      try {
        const {  data: imageData,  error: imageErr } = await supabase.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, values.image!, {
            upsert: true,
            contentType: "fileBody"
          });

        if (imageErr) {
          toast({
            title: uploadModalLocale("error.song-image-error"),
            description: imageErr.message,
          });
        }

        console.log(values, imageData)
        return imageData;
      } catch (error) {
        toast({
          title: String(error),
          variant: "red"
        });

        return;
      }
    },
  });

  return {
    uploadSongImage
  }
}