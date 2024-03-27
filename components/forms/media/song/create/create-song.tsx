/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { createSongSchema } from "@/lib/schemas/media/create-song";
import { Form } from "@/ui/form";
import { useCreateSong } from "@/lib/hooks/actions/song/use-create-song";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef } from "react";
import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { ArtistEntity } from "@/types/entities/artist";
import { createClient } from "@/lib/utils/supabase/client";
import { getArtistsByUserId } from "@/lib/queries/get-artists-by-user";
import { SongFormFields } from "./fields";
import { for_authors_route, song_route } from "@/lib/constants/routes";
import { Typography } from "@/ui/typography";
import { useRouter } from "next/navigation";
import Link from "next/link";

const supabase = createClient();

type uploadSchema = z.infer<typeof createSongSchema>

export const CreateSongForm = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const { push } = useRouter()
  const { uploadSong } = useCreateSong();

  const { data: artists, isError } = useQuery<ArtistEntity[]>(getArtistsByUserId(supabase, user?.id!), {
    enabled: !!user?.id,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  const [imageRef, songRef] = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null)
  ];

  const form = useForm<uploadSchema>({
    resolver: zodResolver(createSongSchema),
    defaultValues: {
      title: "",
      artists: [],
      album: 0,
      genre: "",
      image: null,
      song: null
    }
  });

  const onSubmit = useCallback(async (values: uploadSchema) => {
    try {
      if (!values) return;

      if (!imageRef.current || !songRef.current) {
        toast({
          title: "Выберите файлы",
          variant: "red"
        });

        return;
      }

      const songFile = songRef.current.files ? songRef.current.files[0] : null;
      const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;

      if (songFile && imageFile && values) {
        await uploadSong.mutateAsync({
          title: values.title,
          artists: values.artists,
          song: songFile,
          image: imageFile,
          album: values.album,
          genre: values.genre
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
  }, [uploadSong, songRef, imageRef, toast])

  useEffect(() => {
    // if (isError) {
    //   toast({
    //     title: "Сначала вы должны создать артиста!",
    //     variant: "red"
    //   })
  
    //   push(`${for_authors_route}/create-artist`);
    // }

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