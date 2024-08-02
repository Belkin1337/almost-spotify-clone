import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserQuery } from "@/lib/query/user/user-query"
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useCallback } from "react";
import { followedArtistQueryKey, userFollowedArtistsQueryKey } from "@/lib/querykeys/artist";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useFollowedArtistQuery } from "@/components/artist/child/artist-follow-button/hooks/use-followed-artist-query";

const supabase = createClient();

export function useArtistFollow(artistId: string) {
	const qc = useQueryClient()
	const { toast } = useToast();
	const { data: user } = useUserQuery();
	
	const { data: followedArtist } = useFollowedArtistQuery({
		artistId, userId: user?.id
	})
	
	const unFollow = useCallback(async() => {
		const { error } = await supabase
		.from("followed_artists")
		.delete()
		.eq("user_id", user?.id)
		.eq("artist_id", artistId)
		
		if (error) throw error;
	}, [ artistId, user?.id ])
	
	const follow = useCallback(async() => {
		const { error } = await supabase
		.from("followed_artists")
		.insert({
			artist_id: artistId,
			user_id: user?.id
		})
		
		if (error) throw error;
	}, [ artistId, user?.id ])
	
	const followMutation = useMutation({
		mutationFn: async() => {
			if (followedArtist?.data?.artist_id === artistId) {
				await unFollow()
				return 'unfollowed';
			} else if (followedArtist?.data?.artist_id !== artistId) {
				await follow()
				return 'followed';
			}
		},
		onSuccess: async(data) => {
			if (data) {
				const variantToast = {
					message: (data === 'unfollowed')
						? "unfollowed"
						: (data === 'followed')
							? 'followed'
							: '',
					variant: (data === 'unfollowed')
						? "red" as "red"
						: (data === 'followed')
							? "right" as "right"
							: '' as "red"
				}
				toast({
					title: variantToast.message,
					variant: variantToast.variant,
				})
				
				await Promise.all([
					qc.invalidateQueries({ queryKey: followedArtistQueryKey(artistId) }),
					qc.invalidateQueries({ queryKey: userFollowedArtistsQueryKey(user?.id!) })
				])
			}
		},
		onError: (error: Error) => { throw new Error(error.message) }
	})
	
	return { followedArtist, followMutation }
}