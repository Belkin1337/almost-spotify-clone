"use client"

import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useUpdateAvatar } from "@/lib/hooks/actions/user/preferences/use-update-avatar";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { updateAvatarSchema } from "@/lib/schemas/user/update-avatar";
import { Form } from "@/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserUpdateAvatarFormFields } from "./fields";
import { useDialog } from "@/lib/hooks/ui/use-dialog";

type uploadSchema = z.infer<typeof updateAvatarSchema>

export const UpdateAvatarForm = () => {
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const { user } = useUser();
  const { refresh } = useRouter();
  const { closeDialog } = useDialog();
  const { toast } = useToast()
  const { uploadAvatar } = useUpdateAvatar()

  const form = useForm<uploadSchema>({
    resolver: zodResolver(updateAvatarSchema),
    defaultValues: {
      avatar: null,
    }
  })

  const onSubmit = useCallback(async () => {
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

      await uploadAvatar.mutateAsync({
        avatarUrl: avatarFile,
        userId: user?.id
      });
    } catch (error) {
      return;
    }
  }, [uploadAvatar, toast, user?.id])

  useEffect(() => {
    if (uploadAvatar.isSuccess) {
      toast({
        title: "Аватар обновлен!",
        variant: "right"
      })

      closeDialog();
      refresh();
    }
  }, [uploadAvatar.isSuccess, closeDialog, refresh, toast])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-6 gap-y-8"
      >
        <UserUpdateAvatarFormFields
          form={form}
          isLoading={uploadAvatar.isPending}
          refs={{
            avatarRef: avatarRef
          }}
        />
      </form>
    </Form>
  )
}