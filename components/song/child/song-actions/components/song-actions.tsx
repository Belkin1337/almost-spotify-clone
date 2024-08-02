import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/ui/dropdown-menu"
import { Typography } from "@/ui/typography";
import { ChevronRight, Copy, ListMinus, Radio, SquareCode, Upload } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Input } from "@/ui/input";
import { usePlaylistsListByUser } from "@/lib/query/playlist/playlists-by-user-query";
import { useUserQuery } from "@/lib/query/user/user-query";
import { useFollowedSongsQuery } from "@/lib/query/user/followed-songs-query";
import { useCallback } from "react"
import { SongEntity } from "@/types/song";
import { PlaylistEntity } from "@/types/playlist";
import { useQueryClient } from "@tanstack/react-query"
import { playlistSongsQueryKey } from "@/lib/querykeys/playlist";
import { CheckmarkCircleIcon } from "@/ui/icons/checkmark-circle";
import { songArtistsQueryKey } from "@/lib/querykeys/song";
import { ArtistBySong } from "@/types/artist";
import { useRouter } from "next/navigation"
import { artist_route_profile } from "@/lib/constants/routes/routes";
import { ShowMoreIcon } from "@/ui/icons/show-more-icon";
import { DefaultPlusIcon } from "@/ui/icons/plus-icon";
import { DiscIcon } from "@/ui/icons/disc-icon";
import { NoteIcon } from "@/ui/icons/note-icon";
import { UserCheckedIcon } from "@/ui/icons/user-icon";
import { TrashIcon } from "@/ui/icons/trash-icon";
import { SearchIcon } from "@/ui/icons/search-icon";
import { ChevronRightIcon } from "@/ui/icons/chevrons-icon";

interface ISongActions {
	song: SongEntity,
	playlist?: PlaylistEntity
}

export const SongActions = ({
	song,
	playlist
}: ISongActions) => {
	const queryClient = useQueryClient()

	const { push } = useRouter();
 	const { data: user } = useUserQuery();
	const { data: followedSongs } = useFollowedSongsQuery(user?.id)
	const { data: userPlaylists } = usePlaylistsListByUser(user?.id, true, 6)

	const songArtists = queryClient.getQueryData<ArtistBySong>(
		songArtistsQueryKey(song.id)
	)

	const songArtist = songArtists?.artists[0];

	const checkSongFollowStatus = useCallback((
		songId: string
	) => {
		if (followedSongs) return followedSongs.songs!.some(item => item.id === songId);

		return false;
	}, [followedSongs])

	const checkSongInPlaylist = useCallback((
		songId: string
	) => {
		if (playlist) {
			const playlistSongs = queryClient.getQueryData<SongEntity[]>(
				playlistSongsQueryKey(playlist.id)
			);

			if (playlistSongs) return playlistSongs.some(playlistSong => playlistSong.id === songId);

			return false;
		}
	}, [playlist, queryClient])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-min">
				<ShowMoreIcon/>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="start"
				side="left"
				className="w-[270px]"
			>
				<HoverCard closeDelay={0} openDelay={0}>
					<HoverCardTrigger>
						<DropdownMenuItem className="flex items-center justify-between">
							<div className="flex gap-x-2 items-center">
								<DefaultPlusIcon/>
								<Typography size="super_small" font="normal">
									Add to Playlist
								</Typography>
							</div>
							<ChevronRight size={16}/>
						</DropdownMenuItem>
					</HoverCardTrigger>
					<HoverCardContent
						align="start"
						side="left"
						className="!p-1"
						alignOffset={-4}
						sideOffset={4}
					>
						<div className="flex flex-col gap-y-1">
							<div className="flex items-center gap-x-2 px-2 bg-neutral-700 rounded-md">
								<SearchIcon/>
								<Input
									variant="local_search"
									background="none"
									placeholder="Search playlists..."
								/>
							</div>
							<DropdownMenuItem className="flex gap-x-2 items-center">
								<DefaultPlusIcon/>
								<Typography size="super_small" font="normal">
									New Playlist
								</Typography>
							</DropdownMenuItem>
							<hr className="border border-neutral-700 w-full h-[1px]"/>
							<div className="flex flex-col gap-y-1">
								{userPlaylists && (
									userPlaylists.length >= 1 && (
										userPlaylists.map(playlist => (
											<DropdownMenuItem key={playlist.id}>
												<Typography size="super_small" font="normal">
													{playlist.title}
												</Typography>
											</DropdownMenuItem>
										))
									)
								)}
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
				{checkSongInPlaylist(song.id) && (
					<DropdownMenuItem className="flex items-center justify-between">
						<div className="flex gap-x-2 items-center">
							<TrashIcon/>
							<Typography size="super_small" font="normal">
								Remove from this Playlist
							</Typography>
						</div>
					</DropdownMenuItem>
				)}
				{checkSongFollowStatus(song.id) && (
					<DropdownMenuItem className="flex items-center justify-between">
						<div className="flex gap-x-2 items-center">
							<CheckmarkCircleIcon/>
							<Typography size="super_small" font="normal">
								Remove from your Liked Songs
							</Typography>
						</div>
					</DropdownMenuItem>
				)}
				<DropdownMenuItem className="flex items-center justify-between">
					<div className="flex gap-x-2 items-center">
						<ListMinus size={18} className="text-neutral-400"/>
						<Typography size="super_small" font="normal">
							Add to queue
						</Typography>
					</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator/>
				<DropdownMenuItem className="flex items-center justify-between">
					<div className="flex gap-x-2 items-center">
						<Radio size={18} className="text-neutral-400"/>
						<Typography size="super_small" font="normal">
							Go to song radio
						</Typography>
					</div>
				</DropdownMenuItem>
				{songArtist && (
					<DropdownMenuItem className="flex items-center justify-between">
						<div
							onClick={() => push(artist_route_profile(songArtist.id))}
							className="flex gap-x-2 items-center"
						>
							<UserCheckedIcon/>
							<Typography size="small" font="normal">
								Go to artist
							</Typography>
						</div>
					</DropdownMenuItem>
				)}
				<DropdownMenuItem className="flex items-center justify-between">
					<div className="flex gap-x-2 items-center">
						<DiscIcon/>
						<Typography size="small" font="normal">
							Go to album
						</Typography>
					</div>
				</DropdownMenuItem>
				<DropdownMenuItem className="flex items-center justify-between">
					<div className="flex gap-x-2 items-center">
						<NoteIcon/>
						<Typography size="small" font="normal">
							View Credits
						</Typography>
					</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator/>
				<HoverCard closeDelay={0} openDelay={0}>
					<HoverCardTrigger>
						<DropdownMenuItem className="flex items-center justify-between">
							<div className="flex gap-x-2 items-center">
								<Upload size={18} className="text-neutral-400"/>
								<Typography size="small" font="normal">
									Share
								</Typography>
							</div>
							<ChevronRightIcon/>
						</DropdownMenuItem>
					</HoverCardTrigger>
					<HoverCardContent
						side="left"
						align="start"
						className="!p-1 w-[240px]"
						alignOffset={-4}
					>
						<div className="flex flex-col gap-y-1">
							<DropdownMenuItem className="flex gap-x-2 items-center">
								<Copy size={18} className="text-neutral-400"/>
								<Typography size="super_small" font="normal">
									Copy Song Link
								</Typography>
							</DropdownMenuItem>
							<DropdownMenuItem className="flex gap-x-2 items-center">
								<SquareCode size={18} className="text-neutral-400"/>
								<Typography size="super_small" font="normal">
									Embed track
								</Typography>
							</DropdownMenuItem>
						</div>
					</HoverCardContent>
				</HoverCard>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}