"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useScopedI18n } from "@/locales/client";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { Button } from "@/ui/button";
import { createSongSchema } from "@/lib/schemas/song/create-song";
import { Form, FormField } from "@/ui/form";
import { useCreateSong } from "@/lib/hooks/actions/song/use-create-song";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { FormFieldItem } from "@/ui/form-field";

type uploadSchema = z.infer<typeof createSongSchema>

export const UploadSongForm = () => {
  const { toast } = useToast()
  const { uploadSong } = useCreateSong();

  const imageRef = useRef<HTMLInputElement | null>(null);
  const songRef = useRef<HTMLInputElement | null>(null);
  
  const uploadModalLocale = useScopedI18n('main-service.main-part.config')

  const form = useForm<uploadSchema>({
    resolver: zodResolver(createSongSchema),
    defaultValues: {
      author: "",
      title: "",
      album: "",
      genre: "",
      image: null,
      song: null
    }
  });

  const onSubmit = async (values: uploadSchema) => {
    try {
      if (!values.song || !values.image) {
        toast({
          title: "Что-то не так"
        })
        return null;
      }

      if (!imageRef.current) {
        toast({
          title: "Выберите файл обложки"
        });
        return;
      }

      if (!songRef.current) {
        toast({
          title: "Выберите аудиофайл"
        });
        return;
      }

      const songFile = songRef.current.files ? songRef.current.files[0] : null;
      const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;

      if (values.song && values.image) {
        uploadSong.mutateAsync({
          title: values.title,
          author: values.author,
          song: songFile,
          image: imageFile,
          album: values.album,
          genre: values.genre
        });
      }
    } catch (error) {
      toast({
        title: String(error)
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormFieldItem
              label={uploadModalLocale('song-attributes.song-name')}
              input={{
                placeholder: uploadModalLocale('placeholder.fields.example') + ' Awakening',
                name: "song_title",
                autoComplete: false,
                autoCorrect: false
              }}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormFieldItem
              label={uploadModalLocale('song-attributes.song-author')}
              input={{
                placeholder: uploadModalLocale('placeholder.fields.example') + ' Sidewalks and Skeletons',
                name: "song_author",
                autoComplete: false,
                autoCorrect: false
              }}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="album"
          render={({ field }) => (
            <FormFieldItem
              label="Альбом (опционально)"
              input={{
                placeholder: "ex. Avatar Album",
                name: "song_album"
              }}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormFieldItem
              label="Жанр"
              input={{
                placeholder: "ex. Phonk",
                name: "song_genre"
              }}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="song"
          render={({ field: { ref, ...field } }) => (
            <FormFieldItem
              label={`${uploadModalLocale('song-attributes.song-file')} (mp3)`}
              input={{
                name: "song_file",
                accept: ".mp3",
                type: "file",
                ref: songRef
              }}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { ref, ...field } }) => (
            <FormFieldItem
              label={`${uploadModalLocale('song-attributes.song-image')} (webp, jpeg, jpg, png)`}
              input={{
                name: "song_image",
                accept: "image/*",
                type: "file",
                ref: imageRef
              }}
              {...field}
            />
          )}
        />
        <Button type="submit" variant="action">
          {uploadModalLocale('modal.submit')}
        </Button>
      </form>
    </Form>
  )
}