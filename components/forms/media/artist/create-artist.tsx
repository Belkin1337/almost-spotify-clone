"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useScopedI18n } from "@/locales/client";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { Button } from "@/ui/button";
import { Form, FormField } from "@/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormFieldItem } from "@/ui/form-field";
import { Typography } from "@/ui/typography";
import { IoMdMusicalNote } from "react-icons/io";
import { useCreateArtist } from "@/lib/hooks/actions/song/use-create-artist";
import { createArtistSchema } from "@/lib/schemas/media/create-artist";
import Image from "next/image";

type uploadSchema = z.infer<typeof createArtistSchema>

type PreviewSongType = {
  name?: string,
  description?: string,
  image?: string,
  cover_image?: string
}

export const CreateArtistForm = () => {
  const [preview, setPreview] = useState<PreviewSongType>({
    name: '',
    image: '',
    description: '',
    cover_image: ''
  });

  const { toast } = useToast()
  const { createArtist } = useCreateArtist()

  const [imageRef, imageCoverRef] = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null)
  ];

  const uploadModalLocale = useScopedI18n('main-service.main-part.config')

  const form = useForm<uploadSchema>({
    resolver: zodResolver(createArtistSchema),
    defaultValues: {
      name: '',
      description: '',
      cover_image: null,
      image: null
    }
  });

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

  const onSubmit = async (values: uploadSchema) => {
    try {
      if (!values) return;

      if (!imageRef.current) {
        toast({
          title: "Выберите файл",
          variant: "red"
        });
        return;
      }

      const imageCoverFile = imageCoverRef?.current?.files ? imageCoverRef.current.files[0] : null;
      const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;

      if (imageFile) {
        createArtist.mutateAsync({
          name: values.name,
          avatar_url: imageFile,
          cover_image_url: imageCoverFile,
          description: values.description,
        });

        if (createArtist.isSuccess) {
          form.reset();
          setPreview({
            name: '',
            image: '',
            description: '',
            cover_image: ''
          });
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
                    ref: imageRef,
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
                    ref: imageCoverRef,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      handleImageChange('cover_image')(e);
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
          <div className="flex flex-col items-center min-w-[380px] w-fit h-full">
            <div className="flex flex-col items-start gap-y-4 w-full">
              <Typography className="truncate">
                Предварительный результат
              </Typography>
              <div className="flex relative bg-neutral-800 border border-neutral-700 bg-cover w-full gap-x-4 rounded-xl p-4 overflow-hidden"
                style={{ backgroundImage: `url(${preview.cover_image})` }}
              >
                <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/50 w-full h-full" />
                <div className="relative flex justify-center items-center w-[80px] h-[80px] overflow-hidden">
                  {preview.image ? (
                    <Image
                      src={preview.image}
                      alt="Track"
                      width={400}
                      height={400}
                      className="object-cover w-full h-full rounded-full"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center border border-neutral-700 rounded-full overflow-hidden bg-neutral-800 w-full h-full">
                      <IoMdMusicalNote size={20} />
                    </div>
                  )}
                </div>
                <div className="relative flex flex-col gap-y-1 bg-black/10 w-fit">
                  <Typography className="!truncate font-semibold">
                    {preview.name || 'Неизвестен'}
                  </Typography>
                  <p className="text-md !text-neutral-400 text-ellipsis truncate font-medium">
                    {preview.description || '...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}