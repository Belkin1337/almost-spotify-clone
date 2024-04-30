import { updateAvatarSchema } from "@/components/forms/user/personal/avatar/schemas/schema-update-avatar"
import { Button } from "@/ui/button"
import { FormField } from "@/ui/form"
import { FormFieldItem } from "@/ui/form-field"
import { Typography } from "@/ui/typography"
import { MutableRefObject } from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/ui/input";

type zodUploadSchema = z.infer<typeof updateAvatarSchema>

interface IUpdateAvatarFormFields {
	form: UseFormReturn<zodUploadSchema>,
	refs: {
		avatarRef: MutableRefObject<HTMLInputElement | null>
	},
	isLoading: boolean
}

export const UpdateAvatarFormFields = ({
	form,
	refs,
	isLoading
}: IUpdateAvatarFormFields) => {
	return (
		<>
			<FormField
				control={form.control}
				name="avatar"
				render={({ field: { ref, ...field } }) => (
					<FormFieldItem label="Аватар" {...field}>
						<Input
							name="user_avatar"
							accept="image/*"
							type="file"
							ref={refs.avatarRef}
						/>
					</FormFieldItem>
				)}
			/>
			<Button variant="form" disabled={isLoading} type="submit">
				<Typography>
					Обновить
				</Typography>
			</Button>
		</>
	)
}