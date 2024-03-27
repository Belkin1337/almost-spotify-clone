"use client"

import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useUpdateName } from "@/lib/hooks/actions/user/preferences/use-update-name";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { updateNameSchema } from "@/lib/schemas/user/update-name";
import { Button } from "@/ui/button";
import { Form, FormField } from "@/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserAvatar } from "../../../../user/personal/child/user-avatar";
import { FormFieldItem } from "@/ui/form-field";
import { Typography } from "@/ui/typography";
import { UserUpdateNameFormFields } from "./fields";
import { useCallback, useEffect } from "react";

type uploadSchema = z.infer<typeof updateNameSchema>

export const UpdateNameForm = () => {
  const { user } = useUser();

  const { toast } = useToast()
  const { closeDialog } = useDialog()
  const { refresh } = useRouter()
  const { uploadUserName } = useUpdateName();

  const form = useForm<uploadSchema>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
    }
  })

  const onSubmit = useCallback(async (values: uploadSchema) => {
    try {
      await uploadUserName.mutateAsync({
        firstName: values.first_name,
        lastName: values.last_name,
        userId: user?.id
      });
    } catch (error) {
      toast({
        title: "Не удалось обновить информацию.",
        variant: "red"
      })

      return;
    }
  }, [toast, uploadUserName, user?.id])

  useEffect(() => {
    if (uploadUserName.isSuccess && uploadUserName.data) {
      const user = uploadUserName.data[0];

      toast({
        title: "Данные обновлены!",
        description: (
          <Typography className="!text-black">
            Изменения &gt; {user.first_name} {user.last_name}
          </Typography>
        ),
        variant: "right"
      })

      closeDialog();
      refresh();
    }
  }, [uploadUserName.isSuccess, uploadUserName.data, closeDialog, toast, refresh])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-[560px] p-6"
      >
        <UserUpdateNameFormFields
          form={form}
          isLoading={uploadUserName.isPending}
          user={user!}
        />
      </form>
    </Form>
  )
}