/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { Form } from "@/ui/form";
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
import { useEditSong } from "@/lib/hooks/actions/song/use-edit-song";
import { SongEntity } from "@/types/entities/song";
import { songSchema } from "@/lib/schemas/media/schema-create-song";
import Link from "next/link";
import { editSongSchema } from "@/lib/schemas/media/schema-edit-song";

const supabase = createClient();

type editSchema = z.infer<typeof editSongSchema>

export const EditSongForm = ({ 
  song 
}: { 
  song: SongEntity 
}) => {
  const { user } = useUser();
  const { toast } = useToast();
  const { editSong } = useEditSong();

  const { data: artists, isError: artistError } = useQuery<ArtistEntity[]>(getArtistsByUserId(supabase, user?.id!), {
    enabled: !!user?.id,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  const artistSongId = useCallback(() => {
    const songArtists = song?.artists ? song?.artists.map(item => item) : [];
  
    return artists?.filter(artist => songArtists.includes(artist.id)) || [];
  }, []);

  const imageRef = useRef<HTMLInputElement>(null)

  const form = useForm<editSchema>({
    resolver: zodResolver(editSongSchema),
    defaultValues: {
      title: song ? song?.title : "",
      artists: song ? song.artists : [],
      album: song ? song?.album : "",
      genre: song ? song?.genre : "",
      image: undefined,
    }
  });

  const onSubmit = useCallback(async (values: editSchema) => {
    try {
      if (!values || !imageRef.current) return;

      const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;

      if (imageFile && values) {
        await editSong.mutateAsync({
          id: song?.id,
          title: values.title,
          album: values.album,
          artists: values.artists,
          image: imageFile,
          genre: values.genre
        })
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
  }, [editSong, imageRef, toast])

  useEffect(() => {
    if (editSong.isSuccess && editSong.data) {
      form.reset();
      toast({
        title: "Трек изменен!",
        description: (
          <Link href={`${song_route}/${song?.id}`}>
            <Typography className="!text-black !font-bold underline">
              Перейти к треку
            </Typography>
          </Link>
        ),
        variant: "right"
      })
    } else if (editSong.isError) {
      toast({
        title: "Ошибка изменения трека. Повторите попытку позже!",
        variant: "red"
      })
    }

    if (!song) {
      toast({
        title: "Произошла ошибка при загрузке трека",
        variant: "red"
      })
    }
  }, [editSong.isSuccess, editSong.isError, editSong.data])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 p-6 min-w-[1100px]"
      >
        <SongFormFields
          form={form}
          type="edit"
          artists={artistSongId()}
          isLoading={editSong.isPending}
          song={song!}
          refs={{
            imageRef: imageRef
          }}
        />
      </form>
    </Form>
  )
}