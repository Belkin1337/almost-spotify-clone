"use client"

import { useCreateAlbum } from "@/lib/hooks/actions/song/use-create-album";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { createAlbumSchema } from "@/lib/schemas/media/create-album";
import { Form } from "@/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getSongsByUserId } from "@/lib/queries/get-songs-by-userId";
import { SongEntity } from "@/types/entities/song";
import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { AlbumFormFields } from "./fields";

const supabase = createClient();

type uploadSchema = z.infer<typeof createAlbumSchema>

export const CreateAlbumForm = () => {
  const { user } = useUser();
  const { createAlbum } = useCreateAlbum();
  const { toast } = useToast();

  const { data: songs } = useQuery<SongEntity[]>(getSongsByUserId({
    client: supabase,
    userId: user?.id!
  }), {
    enabled: !!user?.id!
  });

  const imageRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<uploadSchema>({
    resolver: zodResolver(createAlbumSchema),
    defaultValues: {
      title: "",
      artist: "",
      genre: "",
      image: null,
      songs: []
    }
  });

  const onSubmit = useCallback(async (values: uploadSchema) => {
    try {
      if (!values || !imageRef.current) return;

      const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;

      if (imageFile && values) {
        await createAlbum.mutateAsync({
          title: values.title,
          artist: values.artist,
          image_url: imageFile,
          genre: values.genre,
          songs: values.songs
        })
      }

    } catch (e) {
      toast({
        title: String(e),
        variant: "red"
      })

      return;
    }
  }, [createAlbum, toast])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6"
      >
        <AlbumFormFields 
          form={form}
          songs={songs!}
          isLoading={createAlbum.isPending}
          refs={{
            imageRef: imageRef
          }}
        />
      </form>
    </Form>
  )
}