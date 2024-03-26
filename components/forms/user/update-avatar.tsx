"use client"

import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useUpdateAvatar } from "@/lib/hooks/actions/user/preferences/use-update-avatar";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { updateAvatarSchema } from "@/lib/schemas/user/update-avatar";
import { Button } from "@/ui/button";
import { Form, FormField } from "@/ui/form";
import { FormFieldItem } from "@/ui/form-field";
import { Typography } from "@/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type uploadSchema = z.infer<typeof updateAvatarSchema>

export const UpdateAvatarForm = () => {
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const { user } = useUser();
  const { refresh } = useRouter();
  const { toast } = useToast()
  const { uploadAvatar } = useUpdateAvatar()

  const form = useForm<uploadSchema>({
    resolver: zodResolver(updateAvatarSchema),
    defaultValues: {
      avatar: null,
    }
  })

  const onSubmit = () => {
    try {
      if (!avatarRef.current) {
        toast({
          title: "Выберите файл",
          variant: "red"
        });

        return;
      }

      const avatarFile = avatarRef.current.files
        ? avatarRef.current.files[0]
        : null;

      uploadAvatar.mutateAsync({
        avatarUrl: avatarFile,
        userId: user?.id
      });

      if (uploadAvatar.isSuccess) {
        refresh();
      }
    } catch (error) {
      toast({
        title: String(error),
        variant: "red"
      })

      return;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col p-6 gap-y-8">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field: { ref, ...field } }) => (
            <FormFieldItem
              label="Аватар"
              input={{
                name: "user_avatar",
                accept: "image/*",
                type: "file",
                ref: avatarRef
              }}
              {...field}
            />
          )}
        />
        <Button
          variant="form"
          disabled={uploadAvatar.isPending}
          type="submit"
        >
          <Typography>
            Обновить
          </Typography>
        </Button>
      </form>
    </Form>
  )
}