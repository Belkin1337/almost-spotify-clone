import { userPlaylistsQueryKey } from "@/lib/querykeys/user";
import { UserEntity } from "@/types/user";
import { PlaylistEntity } from "@/types/playlist";
import { Typography } from "@/ui/typography";
import { userFollowedArtistsQueryKey } from "@/lib/querykeys/artist";
import { ArtistEntity } from "@/types/artist";
import { FaCircle } from "react-icons/fa";
import Link from "next/link";
import { profile_route_followers, profile_route_following } from "@/lib/constants/routes/routes";
import { useQuery } from "@tanstack/react-query";

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

	const publicPlaylistsLength = publicPlaylists?.length;
	const followedArtistsLength = followedArtists?.length;

	return (
		<div className="flex items-center gap-2 overflow-hidden">
			{publicPlaylistsLength && (
				<>
					<Typography size="small" font="normal">
						{publicPlaylistsLength} Public Playlists
					</Typography>
					<FaCircle size={4} className="fill-white"/>
				</>
			)}
			<>
				<Link href={profile_route_followers(user.id)}>
					<Typography size="small" font="normal" variant="link">
						0 Followers
					</Typography>
				</Link>
				<FaCircle size={4} className="fill-white"/>
			</>
			{followedArtistsLength && (
				<Link href={profile_route_following(user.id)}>
					<Typography size="small" font="normal" variant="link">
						{followedArtistsLength} Following
					</Typography>
				</Link>
			)}
		</div>
	)
}