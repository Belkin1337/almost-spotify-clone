import { useUserQuery } from "@/lib/query/user/user-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddPlaylistCollaboratosType = {
	playlistId: string,
	collaborators: Array<string> // users id
}

export const useAddPlaylistCollaborators = () => {
	const queryClient = useQueryClient();

	const { data: user } = useUserQuery();

	const addCollaboratorsMutation = useMutation({
		mutationFn: async ({
			playlistId,
			collaborators
		}: AddPlaylistCollaboratosType) => {

		},
		onSuccess: async (data) => {

		}
	})

	return { addCollaboratorsMutation }
}
// ...