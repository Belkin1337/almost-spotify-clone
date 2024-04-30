import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAvatarSchema } from "@/components/forms/user/personal/avatar/schemas/schema-update-avatar";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation";
import { UpdateAttributesType } from "@/components/forms/user/personal/name/types/update-name-types";
import { useUserQuery } from "@/lib/query/user/user-query";
import { userAvatarQueryKey } from "@/lib/querykeys/user";
import { zodAvatarSchema } from "@/components/forms/user/personal/avatar/types/update-avatar-types";

const supabase = createClient();

export const useUpdateAvatar = () => {
	const { closeDialog } = useDialog();
	const { data: user } = useUserQuery()
	const { toast } = useToast()
	const { refresh } = useRouter();

	const queryClient = useQueryClient();

	const form = useForm<zodAvatarSchema>({
		resolver: zodResolver(updateAvatarSchema),
		defaultValues: {
			avatar: null,
		}
	})

	const uploadFileMutation = useMutation({
		mutationFn: async (
			values: UpdateAttributesType
		) => {
			try {
				if (!values.avatarUrl || !values.userId) return;

				const { data: userAvatar, error: uploadError } = await supabase
					.storage
					.from("users")
					.upload(`${values.userId}-avatar`, values.avatarUrl, {
						upsert: true,
						contentType: "fileBody",
					});

				if (uploadError) {
					toast({
						title: uploadError.message,
						variant: "red"
					});
				} else return userAvatar;
			} catch (error) {
				throw error;
			}
		},
	});

	const uploadAvatarMutation = useMutation({
		mutationFn: async (
			values: UpdateAttributesType
		) => {
			const [userData] = await Promise.all([
				uploadFileMutation.mutateAsync(values),
			]);

			if (userData) {
				const { error: userError } = await supabase
					.from("users")
					.update({
						avatar_url: userData?.path,
					})
					.eq("id", values.userId)
					.select();

				if (userError) return;
			}
		},
		onSuccess: async () => {
			toast({
				title: "Аватар обновлен!",
				variant: "right"
			})

			closeDialog();
			refresh();

			await queryClient.invalidateQueries({
				queryKey: userAvatarQueryKey(user?.id!),
			});
		},
	});

	return { form, uploadAvatarMutation };
};