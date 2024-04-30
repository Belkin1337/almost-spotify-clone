import { useUserQuery } from "@/lib/query/user/user-query";
import { useUpdateAvatar } from "@/components/forms/user/personal/avatar/hooks/use-update-avatar";
import { Form } from "@/ui/form";
import { useCallback, useRef } from "react";
import { UpdateAvatarFormFields } from "./update-avatar-form-fields";

export const UpdateAvatarForm = () => {
	const avatarRef = useRef<HTMLInputElement | null>(null);

	const { data: user } = useUserQuery();
	const { uploadAvatarMutation, form } = useUpdateAvatar()

	const onSubmit = useCallback(async () => {
		if (!avatarRef.current) return;

		const avatarFile = avatarRef.current.files ? avatarRef.current.files[0] : null;

		await uploadAvatarMutation.mutateAsync({
			avatarUrl: avatarFile,
			userId: user?.id
		});
	}, [uploadAvatarMutation, user?.id])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col p-6 gap-y-8">
				<UpdateAvatarFormFields
					form={form}
					isLoading={uploadAvatarMutation.isPending}
					refs={{ avatarRef: avatarRef }}
				/>
			</form>
		</Form>
	)
}