import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFollowSong } from "@/lib/queries/song/single/get-follow-song";
import { useCallback } from "react";
import { followedSongQueryKey, followedSongsQueryKey } from "@/lib/querykeys/song";
import { useUserQuery } from "@/lib/query/user/user-query";
import { ToastAction } from "@/ui/toast";
import Image from "next/image";
import { useScopedI18n } from "@/locales/client";
import { useToast } from "@/lib/hooks/ui/use-toast";

const supabase = createClient();

export type FollowedSong = {
	user_id: string,
	song_id: string,
	created_at: string
}

export function useSongFollow(songId: string) {
	const { toast } = useToast();
	const { data: user } = useUserQuery();

	const queryClient = useQueryClient();
	const likeButtonLocale = useScopedI18n('main-service.main-part.config')

	const getFollowedSong = useCallback(async () => {
		if (user && songId) {
			return await getFollowSong(supabase, songId, user.id);
		}
	}, [songId, user])

	const { data: followedSong } = useQuery({
		queryKey: followedSongQueryKey(user?.id!, songId),
		queryFn: getFollowedSong,
		enabled: !!user && !!songId
	});

	const follow = useCallback(async () => {
		const { error } = await supabase
			.from('liked_songs')
			.insert({
				song_id: songId,
				user_id: user?.id
			})

		if (error) throw error;
	}, [songId, user?.id])

	const unFollow = useCallback(async () => {
		const { error } = await supabase
			.from('liked_songs')
			.delete()
			.eq('user_id', user?.id)
			.eq('song_id', songId)

		if (error) throw error;
	}, [songId, user?.id])

	const followMutation = useMutation({
		mutationFn: async () => {
			if (followedSong?.data?.song_id === songId) {
				try {
					await unFollow();
					return 'unfollowed';
				} catch (e) {
					throw e;
				}
			} else if (followedSong?.data?.song_id !== songId) {
				try {
					await follow();
					return 'followed';
				} catch (e) {
					throw e;
				}
			}
		},
		onSuccess: async (data) => {
			if (data) {
				const variantToast = {
					message: (data === 'unfollowed') ? likeButtonLocale('toast.remove-liked-songs')
						: (data === 'followed') ? likeButtonLocale('toast.add-liked-songs') : '',
					variant: (data === 'unfollowed') ? "red" as "red" : (data === 'followed')
						? "right" as "right" : '' as "red"
				}

				toast({
					title: variantToast.message,
					variant: variantToast.variant,
					action:
						<ToastAction
							altText={`${variantToast.message}`}
							className="rounded-md p-0 overflow-hidden h-[36px] w-[36px]">
							<Image
								src="/images/liked.png"
								width={36}
								height={36}
								alt={`${variantToast.message}`}
							/>
						</ToastAction>
				});

				await queryClient.invalidateQueries({
					queryKey: followedSongsQueryKey(user?.id!) // invalidate user followed songs song_list
				})

				await queryClient.invalidateQueries({
					queryKey: followedSongQueryKey(user?.id!, songId) // invalidate user current followed song
				})
			}
		},
		onError: (error: Error) => {
			throw error;
		},
	})

	return { followedSong, followMutation, }
}