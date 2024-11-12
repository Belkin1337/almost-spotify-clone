import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SongAttributes, SongEntity } from "@/types/song";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { UserEntity } from "@/types/user";
import { createSingle } from "@/components/forms/single/queries/create-single";

type CreateSingle = {
	song: SongEntity,
	imageData: { path: string },
	values: SongAttributes
}

export const useCreateSingle = () => {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	
	const createSingleMutation = useMutation({
		mutationFn: async({ song, imageData, values }: CreateSingle) => {
			if (!user || !values.artists) return;
			
			return createSingle({
				title: song.title,
				userId: user.id,
				imagePath: imageData.path,
				artists: values.artists,
				songId: song.id
			})
		},
		onError: e => { throw new Error(e.message)}
	})
	
	return { createSingleMutation }
}