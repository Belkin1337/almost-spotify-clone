import { UserAvatar } from "@/components/user/personal/child/user-avatar"
import { updateNameSchema } from "@/lib/schemas/user/update-name"
import { UserGeneric } from "@/types/entities/user"
import { Button } from "@/ui/button"
import { FormField } from "@/ui/form"
import { FormFieldItem } from "@/ui/form-field"
import { Typography } from "@/ui/typography"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

type uploadSchema = z.infer<typeof updateNameSchema>

export const UserUpdateNameFormFields = ({
  form,
  isLoading,
  user
}: {
  form: UseFormReturn<uploadSchema>,
  isLoading: boolean,
  user: UserGeneric
}) => {
  return (
    <>
      <Typography>
        Данные профиля
      </Typography>
      <div className="flex items-center gap-x-6 justify-between gap-y-6">
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
          <Button
            disabled={isLoading}
            variant="form"
            type="submit"
          >
            <Typography>
              Обновить
            </Typography>
          </Button>
        </div>
      </div>
    </>
  )
}