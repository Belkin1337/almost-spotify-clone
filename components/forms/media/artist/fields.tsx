import { createArtistSchema } from "@/lib/schemas/media/create-artist";
import { useScopedI18n } from "@/locales/client";
import { Button } from "@/ui/button";
import { FormField } from "@/ui/form";
import { FormFieldItem } from "@/ui/form-field";
import { Typography } from "@/ui/typography";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ArtistFormPreview } from "./preview";
import { PreviewArtistType } from "@/lib/constants/preview";

type uploadSchema = z.infer<typeof createArtistSchema>

export const ArtistFormFields = ({
  form,
  isLoading,
  refs
}: {
  form: UseFormReturn<uploadSchema>,
  isLoading: boolean,
  refs?: {
    imageCoverRef?: MutableRefObject<HTMLInputElement | null>,
    imageRef?: MutableRefObject<HTMLInputElement | null>
  }
}) => {
  const [preview, setPreview] = useState<PreviewArtistType>({
    name: '',
    image: '',
    description: '',
    cover_image: ''
  });

  const uploadModalLocale = useScopedI18n('main-service.main-part.config')

  const handleImageChange = useCallback((fieldName: keyof uploadSchema) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;

      if (file) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          setPreview((prev) => ({
            ...prev,
            [fieldName]: reader.result as string
          }));
        };
      }
    };
  }, []);

  const handleInputChange = useCallback(
    (fieldName: keyof uploadSchema) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPreview(prevState => ({
        ...prevState,
        [fieldName]: e.target.value
      }));
    }, []);

  useEffect(() => {
    console.log(preview)
  }, [preview])

  return (
    <div className="flex lg:flex-row flex-col gap-x-4 gap-y-6 items-center justify-stretch">
      <div className="flex flex-col gap-y-8 w-2/3">
        <FormField
          control={form.control}
          name="name"
          render={({ field: {
            onChange,
            ...field
          } }) => (
            <FormFieldItem
              label='Имя артиста'
              input={{
                placeholder: 'Имя',
                name: "artist_name",
                autoComplete: 'false',
                autoCorrect: 'false',
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputChange('name')(e)
                  onChange && onChange(e);
                }
              }}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field: {
            onChange,
            ...field
          } }) => (
            <FormFieldItem
              label='Описание артиста'
              input={{
                placeholder: 'Описание',
                name: "artist_description",
                autoComplete: 'false',
                autoCorrect: 'false',
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputChange('description')(e)
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
              label="Аватарка артиста"
              input={{
                name: "artist_image",
                accept: "image/*",
                type: "file",
                ref: refs?.imageRef,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  handleImageChange('image')(e);
                  onChange && onChange(e);
                }
              }}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="cover_image"
          render={({ field: {
            ref,
            onChange,
            ...field
          } }) => (
            <FormFieldItem
              label="Фон артиста"
              input={{
                name: "artist_cover_image",
                accept: "image/*",
                type: "file",
                ref: refs?.imageCoverRef,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  handleImageChange('cover_image')(e);
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
      <ArtistFormPreview preview={preview} />
    </div>
  )
}