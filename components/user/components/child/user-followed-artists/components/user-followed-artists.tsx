import { Typography } from "@/ui/typography";
import { ArtistCard } from "@/components/artist/components/card/components/artist-card";
import { useFollowedArtistsQuery } from "@/lib/query/user/followed-artists-query";
import { UserEntity } from "@/types/user";

export const UserFollowedArtists = ({
	user
}: {
	user: UserEntity
}) => {
	const { data: followedArtists, isError } = useFollowedArtistsQuery(user?.id!)

	if (followedArtists && followedArtists?.length === 0 || !user) return null;

	return (
		<div className="flex relative flex-col gap-y-4">
			<div className="flex flex-col">
				<Typography className="text-2xl" font="semibold" text_color="white">
					Подписки
				</Typography>
			</div>
			<div className="flex items-center gap-4 flex-wrap">
				{followedArtists?.map(artist => (
					<ArtistCard key={artist.id} artist={artist} variant="search"/>
				))}
			</div>
		</div>
	)
}