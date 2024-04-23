import { PlaylistEntity } from "@/types/playlist";
import { UserPlus } from 'lucide-react';
import { UserTips } from "@/components/tooltip/components/action";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/ui/dropdown-menu";
import { MoreIcon } from "@/ui/icons/more-icon";
import { Minus, Lock, CircleUser, Pen, ExternalLink, Globe } from 'lucide-react';
import { Typography } from "@/ui/typography";
import { useEditTypePlaylist } from "@/components/playlist/hooks/use-edit-type-playlist";
import { useCallback, useEffect } from "react";
import { useDeletePlaylist } from "@/components/playlist/hooks/use-delete-playlist";
import { useRouter } from "next/navigation";

export const PlaylistToolsBar = ({
	playlist
}: {
	playlist: PlaylistEntity
}) => {
	const { push } = useRouter()
	const { editType } = useEditTypePlaylist()
	const { deletePlaylist } = useDeletePlaylist()

	const handleEditPlaylistType = useCallback(async () => {
		await editType.mutateAsync(playlist)
	}, [playlist, editType])

	const handleDeletePlaylist = useCallback(async () => {
		await deletePlaylist.mutateAsync(playlist)
	}, [playlist, deletePlaylist])

	useEffect(() => {
		if (deletePlaylist.isSuccess) {
			push("/home")
		} else {
			return;
		}
	}, [deletePlaylist.isSuccess]);

	if (!playlist) return;

	return (
		<div className="flex items-center gap-x-10 px-6 py-6">
			<div className="flex items-center gap-x-4">
				<UserTips action={`Invite collaborators to ${playlist.title}`}>
					<UserPlus size={42} className="text-neutral-400 hover:scale-[1.06]"/>
				</UserTips>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<MoreIcon />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuItem className="flex justify-start gap-x-2 items-center">
							<CircleUser size={18} className="text-neutral-400"/>
							<Typography size="small" text_color="white">
								Add to profile
							</Typography>
						</DropdownMenuItem>
						<DropdownMenuSeparator/>
						<DropdownMenuItem className="flex justify-start gap-x-2 items-center">
							<Pen size={18} className="text-neutral-400"/>
							<Typography size="small" text_color="white">
								Edit details
							</Typography>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={handleDeletePlaylist} className="flex justify-start gap-x-2 items-center">
							<Minus size={18} className="text-neutral-400"/>
							<Typography size="small" text_color="white">
								Delete
							</Typography>
						</DropdownMenuItem>
						<DropdownMenuSeparator/>
						<DropdownMenuItem onClick={handleEditPlaylistType} className="flex justify-start gap-x-2 items-center">
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
						<DropdownMenuItem className="flex justify-start gap-x-2 items-center">
							<ExternalLink size={18} className="text-neutral-400"/>
							<Typography size="small" text_color="white">
								Share
							</Typography>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}