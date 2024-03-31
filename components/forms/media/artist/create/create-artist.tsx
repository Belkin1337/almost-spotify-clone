/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { Form } from "@/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCreateArtist } from "@/lib/hooks/actions/artist/use-create-artist";
import { createArtistSchema } from "@/lib/schemas/media/create-artist";
import { ArtistFormFields } from "../fields";
import { Typography } from "@/ui/typography";
import Link from "next/link";
import { artist_route } from "@/lib/constants/routes";

type uploadSchema = z.infer<typeof createArtistSchema>

export const CreateArtistForm = () => {
  const { toast } = useToast()
  const { createArtist } = useCreateArtist()

  const [imageRef, imageCoverRef] = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null)
  ];

  const form = useForm<uploadSchema>({
    resolver: zodResolver(createArtistSchema),
    defaultValues: {
      name: '',
      description: '',
      cover_image: null,
      image: null
    }
  });

  const onSubmit = useCallback(async (values: uploadSchema) => {
    try {
      if (!values) return;

      if (!imageRef.current) {
        toast({
          title: "Выберите файл",
          variant: "red"
        });
        return;
      }

      const imageCoverFile = imageCoverRef?.current?.files ? imageCoverRef.current.files[0] : null;
      const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;

      if (imageFile && values) {
        await createArtist.mutateAsync({
          name: values.name,
          avatar_url: imageFile,
          cover_image_url: imageCoverFile,
          description: values.description,
        });
      } else {
        toast({
          title: "Все поля должны быть заполнены!",
          variant: "red"
        })

        return;
      }
    } catch (error) {
      toast({
        title: String(error),
        variant: "red"
      })
    }
  }, [createArtist, imageCoverRef, imageRef, toast])

  useEffect(() => {
    if (createArtist.isSuccess && createArtist.data) {
      const artist = createArtist.data[0];

      form.reset();
      toast({
        title: "Артист создан",
        description: (
          <Link href={`${artist_route}/${artist.id}`}>
            <Typography className="!text-black !font-bold underline">
              Перейти к артисту
            </Typography>
          </Link>
        ),
        variant: "right"
      })
    } else if (createArtist.isError) {
      toast({
        title: "Ошибка создания артиста. Повторите попытку позже!",
        variant: "red"
      })
    }
  }, [createArtist.isSuccess, createArtist.isError, createArtist.data]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6"
      >
        <ArtistFormFields
          form={form}
          isLoading={createArtist.isPending}
          refs={{
            imageCoverRef: imageCoverRef,
            imageRef: imageRef
          }}
        />
      </form>
    </Form>
  )
}