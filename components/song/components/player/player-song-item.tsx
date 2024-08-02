import { SongFollowButton } from "@/components/song/child/song-follow-button/components/song-follow-button"
import { SongEntity } from "@/types/song"
import { SongImageItem } from "@/components/song/child/song-image/components/song-image";
import { UserTips } from "@/components/tooltip/components/action";
import { IconArrowDropdown } from "@/ui/icons/arrow-dropdown";
import { IconArrowDropup } from "@/ui/icons/arrow-dropup";
import { SongItemTitle } from "@/components/song/child/song-title/components/song-title";
import { SongArtist } from "@/components/song/child/song-artist/components/song-artist";
import { useWidget } from "@/lib/hooks/ui/use-widget";
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";

export const PlayerSongItem = ({
	song,
}: {
	song: SongEntity,
}) => {
	const { handleWidget, widgetState } = useWidget()
	const { data: artists, isLoading: artistIsLoading } = useSongArtistListQuery(song.id)

	const isSongWidgetVisible = widgetState.data.isOpen;

	if (!song || !artists) return;

	return (
		<div className="flex items-center gap-x-4 w-[30%] overflow-hidden">
			<div className="w-fit flex justify-between items-center rounded-md">
				<div className={`flex items-center gap-x-2 overflow-hidden w-full`}>
					<SongImageItem song={song} variant="player">
						{isSongWidgetVisible ? (
							<UserTips action="Cкрыть">
								<IconArrowDropdown onClick={() => handleWidget.mutate()}/>
							</UserTips>
						) : (
							<UserTips action="Показать">
								<IconArrowDropup onClick={() => handleWidget.mutate()}/>
							</UserTips>
						)}
					</SongImageItem>
					<div className="flex flex-col overflow-hidden justify-self-start">
						<SongItemTitle
							variant="player"
							player={true}
							song={song}
						/>
						<SongArtist
							variant="player"
							artists={artists.artists}
							firstArtist={artists.firstArtist}
							isLoading={artistIsLoading}
						/>
					</div>
				</div>
			</div>
			<SongFollowButton songId={song?.id!}/>
		</div>
	)
}