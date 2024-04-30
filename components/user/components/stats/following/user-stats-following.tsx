"use client"

import { useFollowedArtistsQuery } from "@/lib/query/user/followed-artists-query";
import { ArtistCard } from "@/components/artist/components/card/components/artist-card";
import { useFollowedUsersQuery } from "@/lib/query/user/followed-users-query";
import { UserCard } from "@/components/user/components/card/components/user-card";

export const UserStatsFollowing = ({
	userId
}: {
	userId: string
}) => {
	const { data: artistFollowing } = useFollowedArtistsQuery(userId);
	const { data: usersFollowing } = useFollowedUsersQuery(userId);

	if (!artistFollowing?.length) return;

	return (
		<div className="flex flex-wrap items-center gap-4">
			{artistFollowing?.map(artist => (
				<ArtistCard variant="search" key={artist.id} artist={artist}/>
			))}
			{usersFollowing?.map(user => (
				<UserCard user={user} key={user.id}/>
			))}
		</div>
	)
}