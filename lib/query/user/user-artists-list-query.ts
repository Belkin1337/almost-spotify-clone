import { getArtistsByUserId } from "@/lib/queries/artist/multiple/get-artists-by-user";
import { useQuery } from "@tanstack/react-query";
import { SongsType } from "@/lib/constants/ui/sort-songs";
import { userArtistsQueryKey } from "@/lib/querykeys/user";

export const useUserArtistListQuery = (
	userId: string, songsType?: SongsType
) => useQuery({
	queryKey: userArtistsQueryKey(userId),
	queryFn: () => getArtistsByUserId(userId),
	enabled: songsType ? !!userId || songsType === 'by_artist' : !!userId,
})