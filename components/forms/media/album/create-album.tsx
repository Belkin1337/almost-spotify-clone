"use client"

import { useCreateAlbum } from "@/lib/hooks/actions/song/use-create-album";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { createAlbumSchema } from "@/lib/schemas/media/create-album";
import { Button } from "@/ui/button";
import { Form, FormField } from "@/ui/form";
import { FormFieldItem } from "@/ui/form-field";
import { Typography } from "@/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdMusicalNote } from "react-icons/io";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"
import { getSongsByUserId } from "@/lib/queries/get-songs-by-userId";
import { SongEntity } from "@/types/entities/song";
import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { SongItem } from "@/components/song/song-item";
import { Check } from "lucide-react";
import Image from "next/image";

type PreviewAlbumType = {
  title?: string,
  artist?: string,
  songs: Array<string>,
  genre?: string,
  image?: string
}

const supabase = createClient();

type uploadSchema = z.infer<typeof createAlbumSchema>

export const CreateAlbumForm = () => {
  const [preview, setPreview] = useState<PreviewAlbumType>({
    title: '',
    artist: '',
    songs: [],
    genre: '',
    image: ''
  });

  const { user } = useUser();
  const { createAlbum } = useCreateAlbum();
  const { toast } = useToast();

  const { data: songs } = useQuery<SongEntity[]>(getSongsByUserId(supabase, user?.id!), {
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

  const handleInputChange = useCallback(
    (fieldName: keyof uploadSchema) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        setPreview(prevState => ({
          ...prevState,
          [fieldName]: e.target.value
        }));
      }, []);

  const handleInputChangeSongs = useCallback(() =>
    (value: string) => {
      setPreview(prevState => {
        const stringValue = String(value);
        const songs = prevState.songs || [];
        
        const isPresent = songs.includes(stringValue);
        
        const updatedSongs = isPresent
          ? songs.filter(item => item !== stringValue)
          : [...songs, stringValue]; 
        
        return {
          ...prevState,
          songs: updatedSongs
        };
      });
    }, []);

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
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
    }, []);

  const onSubmit = async (values: uploadSchema) => {
    try {
      if (!values || !imageRef.current) return;

      const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;

      if (imageFile && values) {
        createAlbum.mutateAsync({
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
                  label="Название альбома"
                  input={{
                    placeholder: 'Название',
                    name: "album_title",
                    autoComplete: 'false',
                    autoCorrect: 'false',
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      handleInputChange('title')(e)
                      onChange && onChange(e);
                    }
                  }}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="artist"
              render={({ field: {
                onChange,
                ...field
              } }) => (
                <FormFieldItem
                  label='Артист альбома'
                  input={{
                    placeholder: 'Артист',
                    name: "album_artist",
                    autoComplete: 'false',
                    autoCorrect: 'false',
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      handleInputChange('artist')(e)
                      onChange && onChange(e);
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
                  label="Жанр альбома"
                  input={{
                    placeholder: "Жанр",
                    name: "genre_album",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange('genre')(e)
                      onChange && onChange(e);
                    }
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
                  label='Обложка альбома'
                  input={{
                    name: "album_image",
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
            <FormField
              control={form.control}
              name="songs"
              render={({ field: {
                onChange,
                ...field
              } }) => (
                <Select
                  onValueChange={(value: string) => handleInputChangeSongs()(value)}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="flex flex-col gap-y-2 items-start h-full min-w-[400px] w-[920px] max-w-[1000px]">
                    <Typography className="font-bold text-lg mb-2">
                      Выбранные треки:
                    </Typography>
                    {preview.songs ? (
                      preview.songs.map((item, idx) => (
                        <Typography key={idx}>
                          {item}
                        </Typography>
                      ))
                    ) : (
                      <SelectValue placeholder="Ничего не выбрано" />
                    )}
                  </SelectTrigger>
                  <SelectContent className="min-w-[400px] w-[920px] max-w-[1000px]">
                    {songs?.map((song) => (
                      <SelectItem
                        key={song.id}
                        className="w-full cursor-pointer"
                        value={song.title}
                      >
                        {preview.songs.find(item => item === song.title) &&
                          <span className="absolute bottom-1/2 left-2 flex h-3.5 w-3.5 items-center justify-center">
                            <Check className="h-4 w-4" />
                          </span>
                        }
                        <SongItem
                          variant="select"
                          song={song}
                          select
                          list={{
                            data: songs
                          }}
                        />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Button type="submit" variant="form">
              <Typography>
                Ок
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
                  {preview.artist || 'Неизвестен'}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}