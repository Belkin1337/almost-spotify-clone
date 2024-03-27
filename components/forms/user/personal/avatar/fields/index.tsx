import { updateAvatarSchema } from "@/lib/schemas/user/update-avatar"
import { Button } from "@/ui/button"
import { FormField } from "@/ui/form"
import { FormFieldItem } from "@/ui/form-field"
import { Typography } from "@/ui/typography"
import { MutableRefObject } from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

type uploadSchema = z.infer<typeof updateAvatarSchema>

export const UserUpdateAvatarFormFields = ({
  form,
  refs,
  isLoading
}: {
  form: UseFormReturn<uploadSchema>,
  refs: {
    avatarRef: MutableRefObject<HTMLInputElement | null>
  },
  isLoading: boolean
}) => {
  return (
    <>
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
              ref: refs.avatarRef
            }}
            {...field}
          />
        )}
      />
      <Button
        variant="form"
        disabled={isLoading}
        type="submit"
      >
        <Typography>
          Обновить
        </Typography>
      </Button>
    </>
  )
}