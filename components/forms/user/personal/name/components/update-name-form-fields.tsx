import { UserAvatar } from "@/components/user/components/child/user-avatar/components/user-avatar"
import { UserEntity } from "@/types/user"
import { Button } from "@/ui/button"
import { FormField } from "@/ui/form"
import { FormFieldItem } from "@/ui/form-field"
import { Typography } from "@/ui/typography"
import { UseFormReturn } from "react-hook-form"
import { Input } from "@/ui/input";
import { zodNameSchema } from "@/components/forms/user/personal/name/types/update-name-types";

export const UserUpdateNameFormFields = ({
	form, isLoading, user
}: { form: UseFormReturn<zodNameSchema>, isLoading: boolean, user: UserEntity }) => {
	return (
		<>
			<Typography>Данные профиля</Typography>
			<div className="flex items-center gap-x-6 justify-between gap-y-6">
				<div className="flex overflow-hidden h-[224px] w-[224px] rounded-full">
					<UserAvatar user={user!}/>
				</div>
				<div className="flex flex-col gap-y-8 w-1/2">
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormFieldItem label="Имя" {...field}>
								<Input
									type="text"
									placeholder={user?.full_name || "Имя..."}
									name="first_name"
								/>
							</FormFieldItem>
						)}
					/>
					<Button disabled={isLoading} variant="form" type="submit">
						<Typography>Обновить</Typography>
					</Button>
				</div>
			</div>
		</>
	)
}