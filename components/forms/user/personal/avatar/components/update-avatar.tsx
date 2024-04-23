import { useUserQuery } from "@/lib/query/user/user-query";
import { useUpdateAvatar } from "@/components/forms/user/personal/avatar/hooks/use-update-avatar";
import { Form } from "@/ui/form";
import { useCallback, useRef } from "react";
import { UserUpdateAvatarFormFields } from "./fields";

export const UpdateAvatarForm = () => {
	const avatarRef = useRef<HTMLInputElement | null>(null);
	const { data: user } = useUserQuery();
	const { uploadAvatar, form } = useUpdateAvatar()

	const onSubmit = useCallback(async () => {
		if (!avatarRef.current) return;

		const avatarFile = avatarRef.current.files ? avatarRef.current.files[0] : null;

		await uploadAvatar.mutateAsync({
			avatarUrl: avatarFile,
			userId: user?.id
		});
	}, [uploadAvatar, user?.id])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col p-6 gap-y-8">
				<UserUpdateAvatarFormFields
					form={form}
					isLoading={uploadAvatar.isPending}
					refs={{ avatarRef: avatarRef }}
				/>
			</form>
		</Form>
	)
}