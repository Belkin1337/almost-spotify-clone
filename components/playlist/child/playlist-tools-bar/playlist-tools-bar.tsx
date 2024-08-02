import { PlaylistEntity } from "@/types/playlist";
import { CircleUser, Copy, ExternalLink, Globe, Lock, Minus, Pen, UserPlus } from 'lucide-react';
import { UserTips } from "@/components/tooltip/components/action";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/ui/dropdown-menu";
import { MoreIcon } from "@/ui/icons/more-icon";
import { Typography } from "@/ui/typography";
import { useEditTypePlaylist } from "@/components/playlist/hooks/use-edit-type-playlist";
import { useCallback } from "react";
import { useDeletePlaylist } from "@/components/playlist/hooks/use-delete-playlist";
import { SongPlayButton } from "@/components/song/child/song-play-button/components/song-play-button";
import { SongEntity } from "@/types/song";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Button } from "@/ui/button";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { PlaylistItemProps } from "@/components/playlist/types/playlist-types";

const ConfirmDeleteDialog = ({
	playlist
}: PlaylistItemProps) => {
	const { closeDialog } = useDialog();
	const { deletePlaylistMutation } = useDeletePlaylist()

	const handleDeletePlaylist = useCallback(async () => {
		await deletePlaylistMutation.mutateAsync(playlist)
	}, [playlist, deletePlaylistMutation])

	return (
		<div className="flex flex-col gap-y-2 p-6 rounded-xl bg-neutral-100 border border-neutral-950">
			<Typography className="text-2xl" font="bold" text_color="black">
				Delete from Your Library?
			</Typography>
			<Typography size="medium" font="semibold" text_color="black">
				This will delete {playlist.title} from Your Library.
			</Typography>
			<div className="flex items-center mt-2 gap-x-2 justify-end">
				<Button
					align="centered"
					rounded="large"
					className="px-4 py-2"
					onClick={() => closeDialog()}
				>
					<Typography size="xl" font="bold" text_color="black">
						Cancel
					</Typography>
				</Button>
				<Button
					align="centered"
					className="px-4 py-2"
					rounded="large"
					background_color="jade"
					onClick={handleDeletePlaylist}
				>
					<Typography size="xl" font="bold" text_color="black">
						Delete
					</Typography>
				</Button>
			</div>
		</div>
	)
}

interface IPlaylistToolsBar {
	currentUserPlaylist: boolean,
	playlist: PlaylistEntity,
	playlistSongs: SongEntity[]
}

export const PlaylistToolsBar = ({
	playlist,
	playlistSongs,
	currentUserPlaylist
}: IPlaylistToolsBar) => {
	const { editTypePlaylistMutation } = useEditTypePlaylist()
	const { openDialog } = useDialog();

	const handleEditPlaylistType = useCallback(async () => {
		await editTypePlaylistMutation.mutateAsync(playlist)
	}, [playlist, editTypePlaylistMutation])

	if (!playlist) return;

	return (
		<div className="flex items-center gap-x-10 px-6 py-6">
			<SongPlayButton song={playlistSongs[0]} variant="single_page"/>
			<div className="flex items-center gap-x-4">
				{currentUserPlaylist && (
					<UserTips action={`Invite collaborators to ${playlist.title}`}>
						<UserPlus size={34} className="text-neutral-400 hover:scale-[1.06]"/>
					</UserTips>
				)}
				<DropdownMenu>
					<DropdownMenuTrigger>
						<MoreIcon/>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuItem className="flex justify-start gap-x-2 items-center">
							<CircleUser size={18} className="text-neutral-400"/>
							<Typography size="small" text_color="white">
								Add to profile
							</Typography>
						</DropdownMenuItem>
						<DropdownMenuSeparator/>
						{currentUserPlaylist && (
							<>
								<DropdownMenuItem className="flex justify-start gap-x-2 items-center">
									<Pen size={18} className="text-neutral-400"/>
									<Typography size="small" text_color="white">
										Edit details
									</Typography>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => { openDialog({ dialogChildren: <ConfirmDeleteDialog playlist={playlist}/> }) }}
									className="flex justify-start gap-x-2 items-center"
								>
									<Minus size={18} className="text-neutral-400"/>
									<Typography size="small" text_color="white">
										Delete
									</Typography>
								</DropdownMenuItem>
								<DropdownMenuSeparator/>
								<DropdownMenuItem
									onClick={handleEditPlaylistType}
									className="flex justify-start gap-x-2 items-center"
								>
									{playlist.attributes.is_public ? (
										<>
											<Lock size={18} className="text-neutral-400"/>
											<Typography size="small" text_color="white">
												Make Private
											</Typography>
										</>
									) : (
										<>
											<Globe size={18} className="text-neutral-400"/>
											<Typography size="small" text_color="white">
												Make Public
											</Typography>
										</>
									)}
								</DropdownMenuItem>
								<DropdownMenuItem className="flex justify-start gap-x-2 items-center">
									<UserPlus size={18} className="text-neutral-400"/>
									<Typography size="small" text_color="white">
										Invite collaborators
									</Typography>
								</DropdownMenuItem>
								<DropdownMenuSeparator/>
							</>
						)}
						<HoverCard openDelay={0} closeDelay={0}>
							<HoverCardTrigger className="w-full" asChild>
								<DropdownMenuItem className="flex justify-start gap-x-2 items-center">
									<ExternalLink size={18} className="text-neutral-400"/>
									<Typography size="small" text_color="white">
										Share
									</Typography>
								</DropdownMenuItem>
							</HoverCardTrigger>
							<HoverCardContent align="end" side="right">
								<DropdownMenuItem className="flex justify-start gap-x-2 items-center">
									<Copy size={18} className="text-neutral-400"/>
									<Typography>
										Copy link to playlist
									</Typography>
								</DropdownMenuItem>
							</HoverCardContent>
						</HoverCard>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}