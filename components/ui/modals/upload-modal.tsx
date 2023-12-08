"use client"

import { useUploadModal } from "@/hooks/use-upload-modal";

import uniqid from "uniqid"
import { Modal } from "./modal";
import { useState } from "react"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { toast } from 'react-toastify';
import { useUser } from "@/hooks/use-user";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useScopedI18n } from "@/locales/client";

export const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

  const uploadModalLocale = useScopedI18n('main-service.main-part.config')

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    }
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      const uniqueID = uniqid();

      if (!imageFile || !songFile || !user) {
        toast.error("Нужно заполнить все поля!");

        return;
      }

      const {
        data: songData,
        error: songError,
      } = await supabaseClient
        .storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false
        });

      if (songError) {
        setIsLoading(false);

        return toast.error("Что-то пошло не так! Повторите попытку позже.");
      }

      const {
        data: imageData,
        error: imageError,
      } = await supabaseClient
        .storage
        .from("images")
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: "3600",
          upsert: false
        });

      if (imageError) {
        setIsLoading(false);

        return toast.error("Не удалось загрузить изображение!");
      }

      const {
        error: supabaseError
      } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message)
      }

      router.refresh();
      setIsLoading(false);

      toast.success("Трек опубликован. ");

      reset();
      uploadModal.onClose();
    } catch (error) {

      toast.error("Что-то пошло не так! Попробуйте позже.")
    } finally {

      setIsLoading(false);
    }
  }

  return (
    <Modal title={uploadModalLocale('modal.upload.title')} description={uploadModalLocale('modal.upload.note-title') + '*'} isOpen={uploadModal.isOpen} onChange={onChange}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-1">
          <label className="text-WHITE text-[1.1rem]">{uploadModalLocale('song-name')}</label>
          <Input id="title" disabled={isLoading} {...register("title", { required: true })} placeholder={uploadModalLocale('placeholder.fields.example') + ' Awakening'} />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-WHITE text-[1.1rem]">{uploadModalLocale('song-author')}</label>
          <Input
            id="author"
            disabled={isLoading} {...register("author", {
              required: true
            })}
            placeholder={uploadModalLocale('placeholder.fields.example') + ' Sidewalks and Skeletons'}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-WHITE text-[1.1rem]">{uploadModalLocale('song-file')} (mp3)</label>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3" {...register("song", {
              required: true
            })}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-WHITE text-[1.1rem]">{uploadModalLocale('song-image')} (webp, jpeg, jpg, png)</label>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*" {...register("image", {
              required: true
            })}
          />
        </div>
        <button
          className="bg-black/80 rounded-md py-2 hover:bg-black/60 hover:duration-200 duration-200 text-[1.3rem] text-MAIN font-semibold"
          disabled={isLoading}
          type="submit"
        >
          {uploadModalLocale('modal.submit')}
        </button>
      </form>
    </Modal>
  );
}