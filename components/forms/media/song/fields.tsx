"use client"

import { useScopedI18n } from "@/locales/client";
import { ArtistEntity } from "@/types/entities/artist";
import { Button } from "@/ui/button";
import { FormFieldItem } from "@/ui/form-field";
import { Typography } from "@/ui/typography";
import { 
  FormControl,
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/ui/form";
import { 
  ChangeEvent, 
  MutableRefObject, 
  useCallback, 
  useEffect, 
  useState 
} from "react";
import { 
  PreviewSongType, 
  SONG_TYPE_ALBUM,
  SONG_TYPE_SINGLE 
} from "@/lib/constants/preview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ArtistImage } from "@/components/artist/card/child/artist-image";
import { ArtistName } from "@/components/artist/card/child/artist-name";
import { Check } from "lucide-react";
import { SongFormPreview } from "./preview";
import { SongEntity } from "@/types/entities/song";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { songSchema } from "@/lib/schemas/media/schema-create-song";

type createSchema = z.infer<typeof songSchema>

type SongFormFieldType = "create" | "edit"

const songTypeList = [
  {
    name: "Сингл",
    type: SONG_TYPE_SINGLE
  },
  {
    name: "Альбом",
    type: SONG_TYPE_ALBUM
  }
]

export interface FormFieldsProps {
  form: UseFormReturn<createSchema>,
  artists: ArtistEntity[],
  isLoading: boolean,
  type: SongFormFieldType,
  song?: SongEntity,
  songs?: SongEntity[],
  refs?: {
    imageRef?: MutableRefObject<HTMLInputElement | null>,
    songRef?: MutableRefObject<HTMLInputElement | null>
  },
}

export const SongFormFields = ({
  form,
  artists,
  isLoading,
  refs,
  type,
  song
}: FormFieldsProps) => {
  const songImage = useLoadImage(song?.image_path!);

  const [preview, setPreview] = useState<PreviewSongType>({
    title: song ? song.title : '',
    genre: song ? song.genre : '',
    type: song ? song.type : 'single',
    image: song ? (songImage || "") : "",
    album: song ? song.album : '',
    artists: song ? type === 'create' ? [] : artists : []
  });

  const uploadModalLocale = useScopedI18n('main-service.main-part.config')

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;

      if (file) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          setPreview((prev) => ({
            ...prev,
            image: reader.result as string,
          }));
        };
      } else {
        setPreview((prev) => ({
          ...prev,
          image: '',
        }));
      }
    }, []);

  const handleInputChangeArtist = useCallback((
    value: string, 
    artists: ArtistEntity[] | []
  ) => {
    const id = String(value);

    setPreview(prevState => {
      const artistItem = artists.find(item => item.id === id);

      if (!artistItem) return prevState;
  
      const isSelected = prevState.artists?.some(item => item.id === id);

      let updatedArtists: ArtistEntity[];

      if (isSelected) {
        updatedArtists = (prevState.artists || []).filter(item => item.id !== id);
      } else {
        updatedArtists = [...(prevState.artists || []), artistItem];
      }

      form.setValue("artists", updatedArtists.map(item => item.id));

      return {
        ...prevState,
        artists: updatedArtists
      };
    });
  }, [form]);

  const handleInputChange = useCallback(
    (fieldName: keyof createSchema, value: string) => {
      setPreview(prevState => ({
        ...prevState,
        [fieldName]: value
      }));
    }, []);

  const handleTypeChange = useCallback((type: 'album' | 'single') => {
    setPreview(prevState => ({
      ...prevState,
      type: type
    }))
  }, [])

  useEffect(() => {
    console.log(preview, form.getValues())
  }, [preview, form])
  
  if (!song && type === 'edit') return null;

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
              label={uploadModalLocale('song-attributes.song-name')}
              input={{
                placeholder: uploadModalLocale('placeholder.fields.example') + ' Awakening',
                name: "song_title",
                autoComplete: 'false',
                autoCorrect: 'false',
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
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
          name="type"
          render={({ field: {
            onChange,
            value,
            ...field
          } }) => (
            <RadioGroup
              onValueChange={(value: 'single' | 'album') => {
                handleTypeChange(value);
                onChange && onChange(value);
              }}
              defaultValue={preview.type}
              className="flex flex-col space-y-1"
            >
              {songTypeList.map(item => (
                <FormItem
                  key={item.type}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={item.type} />
                  </FormControl>
                  <FormLabel className="font-normal text-md">
                    {item.name}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
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
        {preview.type === 'album' && (
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
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    handleInputChange('album', e.target.value)
                    onChange && onChange(e.target.value);
                  }
                }}
                {...field}
              />
            )}
          />
        )}
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
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  handleInputChange('genre', e.target.value)
                  onChange && onChange(e.target.value);
                }
              }}
              {...field}
            />
          )}
        />
        {type === 'create' && (
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
                  ref: refs?.songRef,
                }}
                {...field}
              />
            )}
          />
        )}
        <FormField
          control={form.control}
          name="image"
          render={({ field: {
            onChange,
            ...field
          } }) => (
            <FormFieldItem
              label={`${uploadModalLocale('song-attributes.song-image')} (webp, jpeg, jpg, png)`}
              input={{
                name: "song_image",
                accept: "image/*",
                type: "file",
                ref: refs?.imageRef,
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  handleImageChange(e);
                  onChange && onChange(e);
                }
              }}
              {...field}
            />
          )}
        />
        <Button
          type="submit"
          variant="form"
          disabled={isLoading}
        >
          <Typography>
            {type === 'create' ? (
              uploadModalLocale('modal.submit')
            ) : type === 'edit' && (
              'Обновить'
            )}
          </Typography>
        </Button>
      </div>
      <SongFormPreview preview={preview} />
    </div>
  )
}