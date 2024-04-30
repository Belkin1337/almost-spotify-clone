import { Button } from "@/ui/button";
import { useFollowUser } from "@/components/user/components/child/user-follow-button/hooks/use-follow-user";
import { MouseEvent, useCallback } from "react";
import { Typography } from "@/ui/typography";

export const UserFollowButton = ({
	userId
}: {
	userId: string
}) => {
	const { followUserMutation, followedUser } = useFollowUser(userId);

	const handleFollowUser = useCallback(async (
		e: MouseEvent<HTMLButtonElement>
	) => {
		e.stopPropagation();
		await followUserMutation.mutateAsync()
	}, [followUserMutation])

	const isFollowed = followedUser?.data?.responder_id === userId;

	return (
		<Button
			disabled={followUserMutation.isPending}
			onClick={handleFollowUser}
			align="centered"
			rounded="full"
			className="!w-fit px-4 py-2 group border hover:scale-[1.04] hover:border-white border-neutral-500"
		>
			<Typography text_color="white" size="small" className="group-hover:scale-[1.02]">
				{isFollowed ? 'Following' : 'Follow'}
			</Typography>
		</Button>
	)
}