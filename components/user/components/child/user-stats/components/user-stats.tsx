import { userFollowers, userPlaylistsQueryKey } from "@/lib/querykeys/user";
import { UserEntity } from "@/types/user";
import { PlaylistEntity } from "@/types/playlist";
import { Typography } from "@/ui/typography";
import { userFollowedArtistsQueryKey } from "@/lib/querykeys/artist";
import { ArtistEntity } from "@/types/artist";
import { FaCircle } from "react-icons/fa";
import Link from "next/link";
import { profile_route_followers, profile_route_following } from "@/lib/constants/routes/routes";
import { useQuery } from "@tanstack/react-query";
import { getFollowedUsersCount } from "@/lib/queries/user/multiple/get-followed-users";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";

const supabase = createClient();

export const UserStats = ({
	user // by page param
}: {
	user: UserEntity
}) => {
	const { data: publicPlaylists } = useQuery<PlaylistEntity[], Error>(
		{ queryKey: userPlaylistsQueryKey(user.id, false) })
	const { data: followedArtists } = useQuery<ArtistEntity[], Error>({
		queryKey: userFollowedArtistsQueryKey(user.id)
	});

	const { data: followers } = useQuery({
		queryKey: userFollowers(user.id),
		queryFn: () => getFollowedUsersCount(user.id)
	})

	const publicPlaylistsLength = publicPlaylists?.length;
	const followedArtistsLength = followedArtists?.length;
	const followersLength = followers || 0;

	return (
		<div className="flex items-center gap-2 overflow-hidden">
			{publicPlaylistsLength && (
				<>
					<Typography size="super_small" font="normal" text_color="gray">
						{publicPlaylistsLength} Public Playlists
					</Typography>
					<FaCircle size={4} className="fill-white"/>
				</>
			)}
			{followersLength >= 1 && (
				<>
					<Link href={profile_route_followers(user.id)}>
						<Typography size="super_small" font="normal" variant="link">
							{followersLength} Followers
						</Typography>
					</Link>
					<FaCircle size={4} className="fill-white"/>
				</>
			)}
			{followedArtistsLength && (
				<Link href={profile_route_following(user.id)}>
					<Typography size="super_small" font="normal" variant="link">
						{followedArtistsLength} Following
					</Typography>
				</Link>
			)}
		</div>
	)
}