"use client"

import uniqid from "uniqid";
import { useRouter } from "next/navigation"
import { useUser } from "../user/auth/use-user";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../ui/use-toast";
import { createClient } from "@/lib/utils/supabase/client";
import { ArtistEntity } from "@/types/entities/artist";

const supabase = createClient();
const uniqueID = uniqid();

type ArtistAttributes = {
  name: string,
  description?: string,
  avatar_url: any,
  cover_image_url: any
}

export function useCreateArtist() {
  const { refresh } = useRouter();
  const { toast } = useToast();
  const { user } = useUser();

  const uploadArtistCoverImage = useMutation({
    mutationFn: async (values: ArtistAttributes) => {
      try {
        const { data: imageCoverData, error } = await supabase
          .storage
          .from("images")
          .upload(`cover_image-${values.name}-${uniqueID}`, values.cover_image_url, {
            upsert: true,
            contentType: "fileBody"
          })

        if (error) {
          toast({
            title: error.message,
            variant: "red"
          })

          return
        }

        return imageCoverData;
      } catch (e) {
        toast({
          title: String(e),
          variant: "red"
        })
      }
    }
  })

  const uploadArtistImage = useMutation({
    mutationFn: async (values: ArtistAttributes) => {
      try {
        const { data: imageData, error } = await supabase
          .storage
          .from("images")
          .upload(`author_image-${values.name}-${uniqueID}`, values.avatar_url, {
            upsert: true,
            contentType: "fileBody"
          })

        if (error) return;

        return imageData;
      } catch (e) {
        toast({
          title: String(e),
          variant: "red"
        })
      }
    }
  })

  const createArtist = useMutation({
    mutationFn: async (values: ArtistAttributes) => {
      try {
        const [imageData, imageCoverData] = await Promise.all([
          uploadArtistImage.mutateAsync(values),
          uploadArtistCoverImage.mutateAsync(values)
        ])

        if (!imageData) {
          throw new Error("Изображения нет")
        }

        const { data: newArtist, error } = await supabase
          .from("artists")
          .insert({
            user_id: user?.id,
            name: values.name,
            description: values.description,
            avatar_url: imageData?.path,
            cover_image_url: imageCoverData?.path
          })
          .select()

          if (error) {
            return;
          } else if (newArtist && !error) {
            return newArtist as ArtistEntity[];
          }
      } catch (e) {
        toast({
          title: String(e),
          variant: "red"
        })
      }
    }
  })

  return {
    createArtist
  }
}