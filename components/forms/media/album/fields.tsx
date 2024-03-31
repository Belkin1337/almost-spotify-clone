import { SongItem } from "@/components/song/song-item";
import { createAlbumSchema } from "@/lib/schemas/media/schema-create-album";
import { SongEntity } from "@/types/entities/song";
import { Button } from "@/ui/button";
import { FormField, FormMessage } from "@/ui/form";
import { FormFieldItem } from "@/ui/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/ui/select";
import { Typography } from "@/ui/typography";
import { Check } from "lucide-react";
import { ChangeEvent, MutableRefObject, useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ArtistName } from "@/components/artist/card/child/artist-name";
import { ArtistImage } from "@/components/artist/card/child/artist-image";
import { ArtistEntity } from "@/types/entities/artist";
import { PreviewAlbumType } from "@/lib/constants/preview";
import { AlbumFormPreview } from "./preview";

type uploadSchema = z.infer<typeof createAlbumSchema>

export const AlbumFormFields = ({
  form,
  songs,
  isLoading,
  artists,
  refs
}: {
  form: UseFormReturn<uploadSchema>,
  isLoading: boolean,
  artists: ArtistEntity[],
  songs: SongEntity[],
  refs: {
    imageRef: MutableRefObject<HTMLInputElement | null>
  }
}) => {
  const [preview, setPreview] = useState<PreviewAlbumType>({
    title: '',
    artists: [],
    songs: [],
    genre: '',
    image: ''
  });

  const handleInputChange = useCallback(
    (fieldName: keyof uploadSchema) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        setPreview(prevState => ({
          ...prevState,
          [fieldName]: e.target.value
        }));
      }, []);

  const handleInputChangeSongs = useCallback((
    value: string,
    songs: SongEntity[] | []
  ) => {
    setPreview(prevState => {
      const songItem = songs.find(item => item.id === value);

      if (!songItem) return prevState;
  
      const isSelected = prevState.songs?.some(item => item.id === value);
  
      let updatedSongs: SongEntity[];
  
      if (isSelected) {
        updatedSongs = (prevState.songs).filter(item => item.id !== value);
      } else {
        updatedSongs = [...(prevState.songs), songItem];
      }
      
      form.setValue("songs", updatedSongs.map(item => item.id));

      return {
        ...prevState,
        songs: updatedSongs
      }
    });
  }, [form]);

  const handleInputChangeArtist = useCallback((
    value: string,
    artists: ArtistEntity[] | []
  ) => {
    const id = String(value);

    setPreview(prevState => {
      const artistItem = artists.find(item => item.id === id);

      const isSelected = prevState.artists?.some(item => item.id === id);

      let updatedArtists: ArtistEntity[];

      if (isSelected) {
        updatedArtists = (prevState.artists || []).filter(item => item.id !== id);
      } else {
        updatedArtists = [...(prevState.artists || []), artistItem!];
      }

      form.setValue("artists", updatedArtists.map(item => item.id));

      return {
        ...prevState,
        artists: updatedArtists
      };
    });
  }, [form]);

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

  useEffect(() => {
    console.log(preview, form.getValues())
  }, [form, preview])

  if (!songs) return null;

  return (
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
          name="artists"
          render={({ field: {
            onChange,
            ...field
          } }) => (
            <div className="flex flex-col gap-y-1">
              <Typography>
                Артист
              </Typography>
              <Select
                defaultValue={field.value[0]}
                onValueChange={(value: string) => {
                  handleInputChangeArtist(value, artists || []);
                  onChange(value);
                }}
              >
                <SelectTrigger className="flex gap-y-2 items-center h-full min-w-[400px] w-full">
                  <div className="flex flex-col">
                    {preview.artists?.length! > 0 ? (
                      <>
                        <Typography className="font-bold text-md mb-2">
                          Выбранные артисты:
                        </Typography>
                        {preview.artists!.map((artist, idx) => (
                          <div key={idx} className="flex items-center p-2 gap-x-2 w-full">
                            <ArtistImage
                              variant="select"
                              artist={artist}
                            />
                            <ArtistName
                              variant="select"
                              artist={artist}
                            />
                          </div>
                        ))}
                      </>
                    ) : (
                      <Typography className="font-bold text-md">
                        Ничего не выбрано
                      </Typography>
                    )}
                  </div>
                </SelectTrigger>
                <SelectContent className="min-w-[400px] w-[920px] max-w-[1000px]">
                  {artists?.map((artist) => (
                    <SelectItem
                      key={artist.id}
                      className="flex flex-row items-center w-full cursor-pointer rounded-md p-2 hover:bg-neutral-800"
                      value={artist.id}
                    >
                      <div className="flex items-center gap-x-2 w-full">
                        {preview.artists?.find(item => item.id === artist.id) && (
                          <Check size={22} className="text-jade-500" />
                        )}
                        <ArtistImage
                          variant="select"
                          artist={artist}
                        />
                        <ArtistName
                          variant="select"
                          artist={artist}
                          className={`${preview.artists?.find(item => item.id === artist.id) && '!text-jade-500'}`}
                        />
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </div>
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
                ref: refs.imageRef,
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
            <>
              <Select
                defaultValue={field.value[0]}
                onValueChange={(value: string) => {
                  handleInputChangeSongs(value, songs || [])
                  onChange(value)
                }}
              >s
                <SelectTrigger className="flex gap-y-2 items-start h-full min-w-[400px] w-[920px] max-w-[1000px]">
                  <div className="flex flex-col">
                    {preview.songs?.length! > 0 ? (
                      <>
                        <Typography className="font-bold text-md mb-2">
                          Выбранные артисты:
                        </Typography>
                        {preview.songs!.map((song, idx) => (
                          <div key={idx} className="flex items-center p-2 gap-x-2 w-full">
                            <Typography>
                              {song?.title}
                            </Typography>
                          </div>
                        ))}
                      </>
                    ) : (
                      <Typography className="font-bold text-md">
                        Ничего не выбрано
                      </Typography>
                    )}
                  </div>
                </SelectTrigger>
                <SelectContent className="min-w-[400px] w-[920px] max-w-[1000px]">
                  {songs?.map((song) => (
                    <SelectItem
                      key={song.id}
                      className="w-full cursor-pointer"
                      value={song.id}
                    >
                      {preview.songs.find(item => item.id === song.id) &&
                        <Check size={22} className="text-jade-500" />
                      }
                      <SongItem
                        variant="select"
                        song={song}
                        list={{
                          data: songs
                        }}
                      />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </>
          )}
        />
        <Button
          type="submit"
          variant="form"
          disabled={isLoading}
        >
          <Typography>
            Создать альбом
          </Typography>
        </Button>
      </div>
      <AlbumFormPreview preview={preview} />
    </div>
  )
}