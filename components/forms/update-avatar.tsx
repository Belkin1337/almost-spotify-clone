"use client"

import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useUpdateAvatar } from "@/lib/hooks/actions/user/preferences/use-update-avatar";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { updateAvatarSchema } from "@/lib/schemas/user/update-avatar";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type uploadSchema = z.infer<typeof updateAvatarSchema>

export const UpdateAvatarForm = () => {
  const { toast } = useToast()
  const { uploadAvatar, isLoading } = useUpdateAvatar()
  const { data: user } = useUser();
  const { refresh } = useRouter()
  const { closeDialog } = useDialog();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<uploadSchema>({
    resolver: zodResolver(updateAvatarSchema),
    defaultValues: {
      avatar: null,
    }
  })

  const onSubmit = async (values: uploadSchema) => {
    try {
      if (!values) {
        toast({
          title: "Что-то не так"
        })
      }

      if (!inputRef.current) {
        toast({
          title: "Выберите файл"
        });
        return;
      }

      const avatarFile = inputRef.current.files ? inputRef.current.files[0] : null;
      
      if (!avatarFile) {
        toast({
          title: "Выберите файл"
        });
        return;
      }

      uploadAvatar.mutate({
        avatarUrl: avatarFile,
        userId: user?.id
      });

      closeDialog();
      refresh()
    } catch (error) {
      toast({
        title: "Не удалось загрузить аватар",
        variant: "red"
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-8">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field: { ref, ...field } }) => (
            <FormItem>
              <FormLabel>
                Аватар
              </FormLabel>
              <FormControl>
                <Input
                  accept="image/*"
                  type="file"
                  ref={inputRef} 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-black/80 rounded-lg py-2 hover:bg-black/60 hover:duration-200 duration-200 text-[1.3rem] font-semibold"
          disabled={isLoading}
          type="submit"
        >
          Загрузить
        </Button>
      </form>
    </Form>
  )
}