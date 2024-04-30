"use client"

import { useCreateAlbum } from "@/components/forms/album/hooks/use-create-album";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { createAlbumSchema } from "@/components/forms/album/schemas/schema-album";
import { Form } from "@/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlbumFormFields } from "./fields";
import Link from "next/link";
import { album_route } from "@/lib/constants/routes/routes";
import { Typography } from "@/ui/typography";

type uploadSchema = z.infer<typeof createAlbumSchema>

export const CreateAlbumForm = () => {
  const { createAlbum } = useCreateAlbum();
  const { toast } = useToast();

  const imageRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<uploadSchema>({
    resolver: zodResolver(createAlbumSchema),
    defaultValues: {
      title: "",
      artists: [],
      songs: [],
      image: null,
    }
  });

  const onSubmit = useCallback(async (
    values: uploadSchema
  ) => {
    try {
      if (!values || !imageRef.current) return;

      const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;

      if (imageFile && values) {
        await createAlbum.mutateAsync({
          title: values.title,
          artists: values.artists,
          image_url: imageFile,
          songs: values.songs
        })
      }
    } catch (e) {
      throw e;
    }
  }, [createAlbum, toast])

  useEffect(() => {
    if (createAlbum.isSuccess && createAlbum.data) {
      const album = createAlbum.data[0];

      form.reset();

      toast({
        title: "Альбом создан!",
        variant: "right",
        description: (
          <Link href={album_route(album.id)}>
            <Typography className="underline" text_color="black" font="bold">
              Перейти к альбому
            </Typography>
          </Link>
        )
      })
    } else if (createAlbum.isError) {
      toast({
        title: "Ошибка создания трека. Повторите попытку позже!",
        variant: "red"
      })

      return;
    }
  }, [createAlbum.isSuccess, form, toast, createAlbum.isError, createAlbum.data])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
        <AlbumFormFields 
          form={form}
          isLoading={createAlbum.isPending}
          refs={{ imageRef: imageRef
        }}
        />
      </form>
    </Form>
  )
}