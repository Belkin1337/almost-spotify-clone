"use client"

import { useCreateAlbum } from "@/components/forms/album/hooks/use-create-album";
import { createAlbumSchema } from "@/components/forms/album/schemas/schema-album";
import { Form } from "@/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlbumFormFields } from "./create-album-form-fields";

export type zodAlbumSchema = z.infer<typeof createAlbumSchema>

export const CreateAlbumForm = () => {
  const { createAlbumMutation } = useCreateAlbum();

  const imageRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<zodAlbumSchema>({
    resolver: zodResolver(createAlbumSchema),
    defaultValues: {
      title: "",
      artists: [],
      songs: [],
      image: null,
    }
  });

  const onSubmit = useCallback(async (
    values: zodAlbumSchema
  ) => {
    try {
      if (!values || !imageRef.current) return;

      const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;

      if (imageFile && values) {
        await createAlbumMutation.mutateAsync({
          title: values.title,
          artists: values.artists,
          image_url: imageFile,
          songs: values.songs
        })
      }
    } catch (e) {
      throw e;
    }
  }, [createAlbumMutation])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
        <AlbumFormFields 
          form={form}
          isLoading={createAlbumMutation.isPending}
          refs={{ imageRef: imageRef
        }}
        />
      </form>
    </Form>
  )
}