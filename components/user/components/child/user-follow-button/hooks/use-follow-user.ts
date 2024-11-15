import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useCallback } from "react";
import { FollowedUserQueryType, getFollowedUser } from "@/lib/queries/user/single/get-followed-user";
import { userFollower, userFollowers } from "@/lib/querykeys/user";
import { UserEntity } from "@/types/user";

const supabase = createClient();

export const useFollowUser = (
	responder_id: string
) => {
	const { toast } = useToast()
	const qc = useQueryClient();
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)

	const queryClient = useQueryClient();

	const getFollowed = useCallback(async () => {
		if (user && responder_id) {
			return getFollowedUser(supabase, user?.id, responder_id)
		}
	}, [responder_id, user])

	const { data: followedUser } = useQuery({
		queryKey: userFollower(user?.id, responder_id),
		queryFn: getFollowed,
		enabled: !!user && !!responder_id
	})

	const unFollowUser = useCallback(async () => {
		const { data: unFollowed, error } = await supabase
			.from("followed_users")
			.delete()
			.eq("responder_id", responder_id)
			.eq("initiator_id", user?.id)
			.select()

		if (error) throw error;

		return unFollowed as FollowedUserQueryType[];
	}, [user?.id, responder_id])

	const followUser = useCallback(async () => {
		const { data: followed, error } = await supabase
			.from("followed_users")
			.insert({
				initiator_id: user?.id,
				responder_id: responder_id
			})
			.select()

		if (error) throw error;

		return followed as FollowedUserQueryType[];
	}, [user?.id, responder_id])

	const followUserMutation = useMutation({
		mutationFn: async () => {
			try {
				if (followedUser?.data?.responder_id === responder_id) { // unfollow
					await unFollowUser()
					return 'unfollowed'
				} else if (followedUser?.data?.responder_id !== responder_id) { // follow
					await followUser()
					return 'followed'
				}
			} catch (e) {
				throw e;
			}
		},
		onSuccess: async (data) => {
			if (data === 'followed') {
				toast({
					title: `Followed`,
					variant: "right"
				})
			} else if (data === 'unfollowed') {
				toast({
					title: `Unfollowed`,
					variant: "red"
				})
			}

			await queryClient.invalidateQueries({
				queryKey: userFollower(user?.id, responder_id)
			})

			await queryClient.invalidateQueries({
				queryKey: userFollowers(user?.id)
			})
		},
		onError: (e: Error) => {
			throw e;
		}
	})

	return { followedUser, followUserMutation }
}