import { useToast } from "@/lib/hooks/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { UserEntity } from "@/types/user";
import { userQueryKey } from "@/lib/querykeys/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateNameSchema } from "@/components/forms/user/personal/name/schemas/schema-update-name";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { Typography } from "@/ui/typography";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation";
import { UpdateAttributesType, zodNameSchema } from "@/components/forms/user/personal/name/types/update-name-types";
import { MESSAGE_ERROR_USER_UPDATE_ROW, MESSAGE_SUCCESS_USER_UPDATE_NAME } from "@/lib/constants/messages/messages";

const supabase = createClient();

type UpdateUserNameQueryType = {
	fullName: string,
	userId: string
}

async function updateUserNameQuery({
	fullName, userId
}: UpdateUserNameQueryType) {
	const { data: updatedUserName, error: updatedUserNameErr } = await supabase
	.from("users")
	.update({ full_name: fullName })
	.eq("id", userId)
	.select()
	
	if (updatedUserNameErr) throw new Error(updatedUserNameErr.message);
	
	return { updatedUserName }
}

export const useUpdateName = () => {
	const qc = useQueryClient();
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	const { toast } = useToast();
	const { closeDialog } = useDialog()
	const { refresh } = useRouter()
	
	const form = useForm<zodNameSchema>({
		resolver: zodResolver(updateNameSchema),
		defaultValues: { fullName: user?.full_name }
	})
	
	const uploadUserNameMutation = useMutation({
		mutationFn: async({ fullName, userId }: UpdateAttributesType) => {
			if (!fullName || !userId) return;
			
			const { updatedUserName } = await updateUserNameQuery({
				fullName: fullName, userId
			})
			
			return updatedUserName as UserEntity[];
		},
		onSuccess: async(data) => {
			if (!data) return toast({
				title: MESSAGE_ERROR_USER_UPDATE_ROW,
				variant: "red"
			})
			
			const user = data[0];
			
			toast({
				title: MESSAGE_SUCCESS_USER_UPDATE_NAME,
				variant: "right",
				description: (
					<Typography className="!text-black">
						Изменения &gt; {user.full_name}
					</Typography>
				),
			})
			
			closeDialog();
			refresh();
			
			return qc.invalidateQueries({ queryKey: userQueryKey })
		},
		onError: e => {throw new Error(e.message)}
	})
	
	return { form, uploadUserNameMutation, }
}