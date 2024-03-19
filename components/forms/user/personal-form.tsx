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
import { UserAvatar } from "../../user/personal/child/user-avatar";
import { FormFieldItem } from "@/ui/form-field";

type uploadSchema = z.infer<typeof updateNameSchema>

export const UpdateNameForm = () => {
  const { toast } = useToast()
  const { closeDialog } = useDialog()
  const { refresh } = useRouter()
  const { uploadUserName } = useUpdateName();
  
  const { data: user } = useUser();

  const form = useForm<uploadSchema>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
    }
  })

  const onSubmit = async (values: uploadSchema) => {
    try {
      uploadUserName.mutate({
        firstName: values.first_name,
        lastName: values.last_name,
        userId: user?.id
      });

      closeDialog();
      refresh()
    } catch (error) {
      toast({
        title: "Не удалось обновить информацию",
        variant: "red"
      })

      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-x-6 w-[560px] justify-between gap-y-6"
      >
        <div className="flex overflow-hidden h-[224px] w-[224px] rounded-full">
          <UserAvatar user={user!} />
        </div>
        <div className="flex flex-col gap-y-8 w-1/2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormFieldItem
                label="Имя"
                input={{
                  type: "text",
                  placeholder: user?.first_name || "Имя...",
                  name: "first_name"
                }}
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormFieldItem
                label="Фамилия"
                input={{
                  type: "text",
                  placeholder: user?.last_name || "Фамилия...",
                  name: "last_name"
                }}
                {...field}
              />
            )}
          />
          <Button disabled={uploadUserName.isPending} type="submit">
            Обновить
          </Button>
        </div>
      </form>
    </Form>
  )
}