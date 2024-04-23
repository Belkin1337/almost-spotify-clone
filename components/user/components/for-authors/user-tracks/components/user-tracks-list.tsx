import { SongItemMain } from "@/components/song/components/main/main-song-item";
import { EditSongSubMenu } from "@/components/forms/song/components/edit-song-sub-menu";
import { SongItem } from "@/components/song/song-item/song-item";
import { Typography } from "@/ui/typography";
import { SongsType, } from "@/lib/constants/ui/sort-songs";
import { useCallback } from "react";
import { SortedListBlock } from "@/ui/sorted-list-block";
import { IUserTracksList } from "@/components/user/components/for-authors/user-tracks/types/user-tracks-types";
import { SongListTableHead } from "@/ui/song-list-table-head";

const UserTracksNotFound = () => {
	return (
		<Typography>
			Треки не найдены.
		</Typography>
	)
}

type UserTracksListType = Omit<IUserTracksList, "handleSort">

export const UserTracksList = ({
	sortType,
	userSongs,
	isLoading
}: UserTracksListType) => {
	const songs = useCallback((
		songsType?: SongsType,
		artistId?: string
	) => {
		if (songsType === 'all') {
			return userSongs;
		} else if (songsType === 'by_artist' && artistId) {
			return userSongs;
		} else return [];
	}, [userSongs]);

	return (
		<SortedListBlock variant={
			sortType.viewType === 'compact' ? 'compact'
				: sortType.viewType === 'list' ? 'list'
					: 'grid'}
		>
			{userSongs ? (
				songs(sortType.songsType, sortType.selectedArtistId)?.length! > 0 ? (
					songs(sortType.songsType, sortType.selectedArtistId)?.map((song,
						idx) => (
						<>
							{sortType.viewType === 'grid' && (
								<SongItemMain key={song.id} song={song}>
									<EditSongSubMenu song={song}/>
								</SongItemMain>
							)}
							{sortType.viewType === 'list' && (
								<SongItem
									key={song.id}
									song={song}
									type="edit"
									isLoading={isLoading}
									song_list={{
										id: String(idx + 1)
									}}
								>
									<EditSongSubMenu song={song}/>
								</SongItem>
							)}
							{sortType.viewType === 'compact' && (
								<SongItem
									key={song.id}
									song={song}
									variant="compact"
									isLoading={isLoading}
									type="edit"
									song_list={{
										id: String(idx + 1)
									}}
								>
									<EditSongSubMenu song={song}/>
								</SongItem>
							)}
						</>
					))
				) : (
					<UserTracksNotFound/>
				)
			) : (
				<UserTracksNotFound/>
			)}
		</SortedListBlock>
	)
}