import { Typography } from "@/ui/typography";
import { ArtistFollowButton } from "@/components/artist/child/artist-follow-button/components/artist-follow-button";
import { ArtistEntity } from "@/types/artist";

type SongCreditsProps = {
	artist_list: ArtistEntity[]
}

export const SongCredits = ({
	artist_list,
}: SongCreditsProps) => {
	return (
		<div className="flex flex-col gap-y-4 w-full rounded-lg cursor-pointer bg-neutral-800 overflow-hidden p-4">
			<div className="flex items-center justify-between">
				<Typography size="xl" font="semibold">
					Credits
				</Typography>
				<Typography size="large" variant="link" text_color="gray">
					Show more
				</Typography>
			</div>
			<div className="flex flex-col gap-y-2">
				{artist_list.map(artist => (
					<div key={artist.id} className="flex justify-between">
						<div className="flex flex-col">
							<Typography size="medium" font="medium">
								{artist.name}
							</Typography>
							<Typography size="small" text_color="gray">
								Composer
							</Typography>
						</div>
						<ArtistFollowButton id={artist.id}/>
					</div>
				))}
			</div>
		</div>
	)
}