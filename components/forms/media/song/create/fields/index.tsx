import { createSongSchema } from "@/lib/schemas/media/create-song";
import { useScopedI18n } from "@/locales/client";
import { ArtistEntity } from "@/types/entities/artist";
import { Button } from "@/ui/button";
import { FormField } from "@/ui/form";
import { FormFieldItem } from "@/ui/form-field";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger
} from "@/ui/select";
import { Typography } from "@/ui/typography";
import { MutableRefObject, useCallback, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IoMdMusicalNote } from "react-icons/io";
import { z } from "zod";
import { ArtistImage } from "@/components/artist/card/child/artist-image";
import { ArtistName } from "@/components/artist/card/child/artist-name";
import { Check } from "lucide-react";
import Image from "next/image";

type uploadSchema = z.infer<typeof createSongSchema>

type PreviewSongType = {
  title?: string,
  artists?: Array<ArtistEntity>,
  album?: number,
  genre?: string,
  image?: string
}

export const SongFormFields = ({
  form,
  artists,
  isLoading,
  refs
}: {
  form: UseFormReturn<uploadSchema>,
  artists: ArtistEntity[],
  isLoading: boolean,
  refs: {
    imageRef: MutableRefObject<HTMLInputElement | null>,
    songRef: MutableRefObject<HTMLInputElement | null>
  }
}) => {
  const [preview, setPreview] = useState<PreviewSongType>({
    title: '',
    artists: [],
    genre: '',
    image: '',
    album: 0
  });

  const uploadModalLocale = useScopedI18n('main-service.main-part.config')

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
            <div className="flex flex-col gap-y-1">
              <Typography>
                Артист
              </Typography>
              <Select
                onValueChange={(value: string) => {
                  handleInputChangeArtist()(value, artists || []);
                  onChange && onChange(value);
                }}
                defaultValue={field.value}
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
            </div>
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
                ref: refs.songRef,
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
        <Button
          type="submit"
          variant="form"
          disabled={isLoading}
        >
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
          <div className="flex flex-col gap-y-2 max-w-[250px]">
            <Typography className="truncate">
              {preview.title || 'Без названия'}
            </Typography>
            <Typography className="text-md !text-neutral-400 truncate">
              {preview.artists?.length! > 0 ? (
                preview?.artists!.map(artist => artist.name).join(', ')
              ) : (
                'Неизвестен'
              )}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}