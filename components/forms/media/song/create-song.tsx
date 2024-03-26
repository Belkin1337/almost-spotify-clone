"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useScopedI18n } from "@/locales/client";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { Button } from "@/ui/button";
import { createSongSchema } from "@/lib/schemas/media/create-song";
import { Form, FormField } from "@/ui/form";
import { useCreateSong } from "@/lib/hooks/actions/song/use-create-song";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormFieldItem } from "@/ui/form-field";
import { Typography } from "@/ui/typography";
import { IoMdMusicalNote } from "react-icons/io";
import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { ArtistEntity } from "@/types/entities/artist";
import { createClient } from "@/lib/utils/supabase/client";
import { getArtistsByUserId } from "@/lib/queries/get-artists-by-user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Check } from "lucide-react";
import Image from "next/image";

const supabase = createClient();

type uploadSchema = z.infer<typeof createSongSchema>

type PreviewSongType = {
  title?: string,
  artists?: Array<ArtistEntity>,
  album?: number,
  genre?: string,
  image?: string
}

export const CreateSongForm = () => {
  const [preview, setPreview] = useState<PreviewSongType>({
    title: '',
    artists: [],
    genre: '',
    image: '',
    album: 0
  });

  const { user } = useUser();
  const { toast } = useToast();
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

  const uploadModalLocale = useScopedI18n('main-service.main-part.config')

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

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;

      if (file) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          setPreview((prev) => ({
            ...prev,
            image: reader.result as string
          }));
        };
      }
    }, [])

  const handleInputChangeArtist = useCallback(() =>
    (value: string, artists: ArtistEntity[] | []) => {
      setPreview(prevState => {
        const id = String(value);
        const artistItem = artists.find(item => item.id === id);

        const isSelected = prevState.artists?.some(item => item.id === id);

        let updatedArtists: ArtistEntity[];

        if (isSelected) {
          updatedArtists = (prevState.artists || []).filter(item => item.id !== id);
        } else {
          updatedArtists = [...(prevState.artists || []), artistItem!];
        }

        return {
          ...prevState,
          artists: updatedArtists
        };
      });
    }, []);

  const handleInputChange = useCallback(
    (fieldName: keyof uploadSchema, value: string) => {
      setPreview(prevState => ({
        ...prevState,
        [fieldName]: value
      }));
    }, []);

  const onSubmit = async (values: uploadSchema) => {
    try {
      if (!values.song || !values.image || isError) {
        toast({
          title: "Выберите файлы",
          variant: "red"
        })

        return;
      }

      if (!imageRef.current || !songRef.current) {
        toast({
          title: "Выберите файлы",
          variant: "red"
        });

        return;
      }

      const songFile = songRef.current.files ? songRef.current.files[0] : null;
      const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;

      if (songFile && imageFile) {
        uploadSong.mutateAsync({
          title: values.title,
          artists: values.artists,
          song: songFile,
          image: imageFile,
          album: values.album,
          genre: values.genre
        });

        if (uploadSong.isSuccess) {
          form.reset();
        }
      }
    } catch (error) {
      toast({
        title: String(error),
        variant: "red"
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6"
      >
        <div className="flex lg:flex-row flex-col gap-x-4 gap-y-6 items-center justify-stretch">
          <div className="flex flex-col gap-y-8 w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field: {
                onChange,
                ...field
              } }) => (
                <FormFieldItem
                  label={uploadModalLocale('song-attributes.song-name')}
                  input={{
                    placeholder: uploadModalLocale('placeholder.fields.example') + ' Awakening',
                    name: "song_title",
                    autoComplete: 'false',
                    autoCorrect: 'false',
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange('title', e.target.value)
                      onChange && onChange(e.target.value);
                    }
                  }}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="artists"
              render={({ field: {
                onChange,
                ...field
              } }) => (
                <Select
                  onValueChange={(value: string) => {
                    handleInputChangeArtist()(value, artists || []);
                    onChange && onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="flex flex-col gap-y-2 items-start h-full min-w-[400px] w-[920px] max-w-[1000px]">
                    <Typography className="font-bold text-lg mb-2">
                      Выбранные артисты:
                    </Typography>
                    {preview.artists ? (
                      preview.artists.map((artist, idx) => (
                        <Typography key={idx}>
                          {artist.name}
                        </Typography>
                      ))
                    ) : (
                      <SelectValue placeholder="Ничего не выбрано" />
                    )}
                  </SelectTrigger>
                  <SelectContent className="min-w-[400px] w-[920px] max-w-[1000px]">
                    {artists?.map((artist) => (
                      <SelectItem
                        key={artist.id}
                        className="w-full cursor-pointer"
                        value={artist.id}
                      >
                        {preview.artists ? (
                          preview?.artists.map((artist, idx) => (
                            <Typography key={idx}>
                              {artist.name}
                            </Typography>
                          ))
                        ) : (
                          <SelectValue placeholder="Ничего не выбрано" />
                        )}
                        <Typography>
                          {artist.name}
                        </Typography>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FormField
              control={form.control}
              name="album"
              render={({ field: {
                onChange,
                ...field
              } }) => (
                <FormFieldItem
                  label="Альбом (опционально)"
                  input={{
                    placeholder: "ex. Avatar Album",
                    name: "song_album",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange('album', e.target.value)
                      onChange && onChange(e.target.value);
                    }
                  }}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field: {
                onChange,
                ...field
              } }) => (
                <FormFieldItem
                  label="Жанр"
                  input={{
                    placeholder: "ex. Phonk",
                    name: "song_genre",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange('genre', e.target.value)
                      onChange && onChange(e.target.value);
                    }
                  }}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="song"
              render={({ field: {
                ref,
                ...field
              } }) => (
                <FormFieldItem
                  label={`${uploadModalLocale('song-attributes.song-file')} (mp3)`}
                  input={{
                    name: "song_file",
                    accept: ".mp3",
                    type: "file",
                    ref: songRef,
                  }}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: {
                ref,
                onChange,
                ...field
              } }) => (
                <FormFieldItem
                  label={`${uploadModalLocale('song-attributes.song-image')} (webp, jpeg, jpg, png)`}
                  input={{
                    name: "song_image",
                    accept: "image/*",
                    type: "file",
                    ref: imageRef,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      handleImageChange(e);
                      onChange && onChange(e);
                    }
                  }}
                  {...field}
                />
              )}
            />
            <Button type="submit" variant="form">
              <Typography>
                {uploadModalLocale('modal.submit')}
              </Typography>
            </Button>
          </div>
          <div className="flex flex-col items-center w-1/4 h-full">
            <div className="flex flex-col items-start gap-y-4">
              <Typography className="truncate">
                Предварительный результат
              </Typography>
              <div className="flex justify-center items-center w-[240px] h-[240px] bg-neutral-800 rounded-xl overflow-hidden">
                {preview.image ? (
                  <Image
                    src={preview.image}
                    alt="Track"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                ) : (
                  <IoMdMusicalNote size={42} />
                )}
              </div>
              <div className="flex flex-col gap-y-2">
                <Typography className="truncate">
                  {preview.title || 'Без названия'}
                </Typography>
                <Typography className="text-md !text-neutral-400 truncate">
                  {preview.artists ? (
                    preview?.artists.map(artist => artist.name).join(', ')
                  ) : (
                    'Неизвестен'
                  )}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}