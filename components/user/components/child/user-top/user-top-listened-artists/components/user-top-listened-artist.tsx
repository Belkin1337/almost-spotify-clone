import { ArtistCard } from "@/components/artist/card/components/artist-card";
import { Typography } from "@/ui/typography";
import { useUserRecentArtistsQuery } from "@/lib/query/user/user-recent-artists-query";
import { UserEntity } from "@/types/user";

export const UserTopListenedArtist = ({
	user
}: {
	user: UserEntity
}) => {
	const { data: artists } = useUserRecentArtistsQuery(user.id);

	if (artists?.length === 0) return;

	return (
		<div className="flex relative  flex-col gap-y-4">
			<div className="flex flex-col">
				<Typography text_color="white" font="semibold" className="text-2xld">
					Топ артистов этого месяца
				</Typography>
				<Typography text_color="gray" size="small">
					Видны только тебе
				</Typography>
			</div>
			<div className="flex flex-wrap gap-4">
				{artists?.map(artist => (
					<ArtistCard
						variant="search"
						key={artist.id}
						artist={artist}
					/>
				))}
			</div>
		</div>
	)
}