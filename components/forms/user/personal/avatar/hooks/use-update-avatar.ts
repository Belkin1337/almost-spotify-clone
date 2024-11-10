import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAvatarSchema } from "@/components/forms/user/personal/avatar/schemas/schema-update-avatar";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation";
import { UpdateAttributesType } from "@/components/forms/user/personal/name/types/update-name-types";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { userAvatarQueryKey } from "@/lib/querykeys/user";
import { zodAvatarSchema } from "@/components/forms/user/personal/avatar/types/update-avatar-types";
import { uploadFileToBuckets } from "@/lib/utils/file/upload-file-to-buckets";
import { MESSAGE_ERROR_FILE_UPLOAD, MESSAGE_SUCCESS_USER_UPDATE_AVATAR } from "@/lib/constants/messages/messages";
import { UserEntity } from "@/types/user";
import { getArrayBuffer } from "@/components/forms/artist/hooks/use-create-artist-image";
import { encode } from "base64-arraybuffer"

const supabase = createClient();

type UpdateUserAvatarQueryType = {
	imagePath: string,
	userId: string
}

async function updateUserAvatarQuery({
	imagePath,
	userId
}: UpdateUserAvatarQueryType) {
	const { data: updatedUserAvatar, error: updatedUserAvatarErr } = await supabase
	.from("users")
	.update({ avatar_url: imagePath, })
	.eq("id", userId)
	.select();
	
	if (updatedUserAvatarErr) throw updatedUserAvatarErr;
	
	return { updatedUserAvatar }
}

export const useUpdateAvatar = () => {
	const { closeDialog } = useDialog();
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
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
		mutationFn: async({ avatarUrl, userId }: UpdateAttributesType) => {
			if (!user) return;
			
			if (!avatarUrl || !userId) return;
			
			const fileName = userId;
			const base64File = await getArrayBuffer(avatarUrl)
			const encodedFile = encode(base64File)
			
			return uploadFileToBuckets({
				fileName, file: encodedFile, bucket: "users", contentType: "image/png"
			})
		},
	});
	
	const uploadAvatarMutation = useMutation({
		mutationFn: async(values: UpdateAttributesType) => {
			if (values && user) {
				const [ userData ] = await Promise.all([
					uploadFileMutation.mutateAsync(values),
				]);
				
				if (userData && values.userId) {
					const { updatedUserAvatar } = await updateUserAvatarQuery({
						imagePath: userData.path,
						userId: values.userId
					})
					
					return updatedUserAvatar;
				}
			}
		},
		onSuccess: async(data) => {
			if (!data) return toast({
				title: MESSAGE_ERROR_FILE_UPLOAD,
				variant: "red"
			})
			
			toast({
				title: MESSAGE_SUCCESS_USER_UPDATE_AVATAR,
				variant: "right"
			})
			
			closeDialog();
			refresh();
			
			await queryClient.invalidateQueries({
				queryKey: userAvatarQueryKey(user?.id),
			});
		},
		onError: e => {throw new Error(e.message)}
	});
	
	return { form, uploadAvatarMutation };
};