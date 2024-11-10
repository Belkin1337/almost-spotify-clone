import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserEntity } from "@/types/user";

type AddPlaylistCollaboratosType = {
	playlistId: string,
	collaborators: Array<string> // users id
}

export const useAddPlaylistCollaborators = () => {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)

	const addCollaboratorsMutation = useMutation({
		mutationFn: async ({ playlistId, collaborators }: AddPlaylistCollaboratosType) => {

		},
		onSuccess: async (data) => {
		
		}
	})

	return { addCollaboratorsMutation }
}
// ...