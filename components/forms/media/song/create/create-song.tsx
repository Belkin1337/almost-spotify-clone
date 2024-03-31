/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { Form } from "@/ui/form";
import { useCreateSong } from "@/lib/hooks/actions/song/use-create-song";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef } from "react";
import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { ArtistEntity } from "@/types/entities/artist";
import { createClient } from "@/lib/utils/supabase/client";
import { getArtistsByUserId } from "@/lib/queries/artist/get-artists-by-user";
import { SongFormFields } from "../fields";
import { song_route } from "@/lib/constants/routes";
import { Typography } from "@/ui/typography";
import { songSchema } from "@/lib/schemas/media/schema-create-song";
import Link from "next/link";

const supabase = createClient();

type createSchema = z.infer<typeof songSchema>

export const CreateSongForm = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const { uploadSong } = useCreateSong();

  const { data: artists } = useQuery<ArtistEntity[]>(getArtistsByUserId(supabase, user?.id!), {
    enabled: !!user?.id,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  const [imageRef, songRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const form = useForm<createSchema>({
    resolver: zodResolver(songSchema),
    defaultValues: {
      title: "",
      artists: [],
      album: "",
      genre: "",
      image: null,
      song: null
    }
  });

  const onSubmit = useCallback(async (values: createSchema) => {
    try {
      if (!values || !songRef.current || !imageRef.current) return;

      const songFile = songRef.current.files ? songRef.current.files[0] : null;
      const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;

      if (songFile && imageFile && values) {
        await uploadSong.mutateAsync({
          title: values.title,
          artists: values.artists,
          album: values.album,
          genre: values.genre,
          song: songFile,
          image: imageFile
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

      return;
    }
  }, [uploadSong, songRef, imageRef, toast])

  useEffect(() => {
    if (uploadSong.isSuccess && uploadSong.data) {
      const song = uploadSong.data[0];

      form.reset();
      toast({
        title: "Трек создан!",
        description: (
          <Link href={`${song_route}/${song.id}`}>
            <Typography className="!text-black !font-bold underline">
              Перейти к треку
            </Typography>
          </Link>
        ),
        variant: "right"
      })
    } else if (uploadSong.isError) {
      toast({
        title: "Ошибка создания трека. Повторите попытку позже!",
        variant: "red"
      })
    }
  }, [uploadSong.isSuccess, uploadSong.isError, uploadSong.data])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6"
      >
        <SongFormFields
          form={form}
          type="create"
          artists={artists || []}
          isLoading={uploadSong.isPending}
          refs={{
            songRef: songRef,
            imageRef: imageRef
          }}
        />
      </form>
    </Form>
  )
}