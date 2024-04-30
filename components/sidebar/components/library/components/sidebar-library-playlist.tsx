import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { UserTips } from "@/components/tooltip/components/action";
import { Button } from "@/ui/button";
import { Folder, Music, Plus } from "lucide-react";
import { useCreatePlaylist } from "@/components/forms/playlist/hooks/use-create-playlist";
import { Typography } from "@/ui/typography";
import { useCallback } from "react";

export const SidebarLibraryPlaylist = () => {
	const { createPlaylistMutation } = useCreatePlaylist();

	const handleCreatePlaylist = useCallback(async () => {
		await createPlaylistMutation.mutateAsync()
	}, [createPlaylistMutation])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserTips action="Create playlist of folder">
					<Button variant="selected" align="centered">
						<Plus className="text-neutral-400" size={22}/>
					</Button>
				</UserTips>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuItem onClick={handleCreatePlaylist} className="gap-x-4">
					<Music size={18} className="text-neutral-400"/>
					<Typography size="small" font="normal">
						Create a new playlist
					</Typography>
				</DropdownMenuItem>
				<DropdownMenuItem className="gap-x-4">
					<Folder size={18} className="text-neutral-400"/>
					<Typography size="small" font="normal">
						Create a new folder
					</Typography>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}