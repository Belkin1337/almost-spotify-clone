import { followedArtistQueryKey } from "@/lib/querykeys/artist";
import { useQuery } from "@tanstack/react-query"
import { GetFollowArtist, getFollowArtist } from "@/lib/queries/artist/single/get-follow-artist";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";

const supabase = createClient()

type FollowedArtistQuery = Omit<GetFollowArtist, "client">

export const useFollowedArtistQuery = ({
	artistId, userId
}: FollowedArtistQuery) => useQuery({
	queryKey: followedArtistQueryKey(userId, artistId),
	queryFn: () => getFollowArtist({
		artistId, userId, client: supabase
	}),
	enabled: !!userId && !!artistId
})