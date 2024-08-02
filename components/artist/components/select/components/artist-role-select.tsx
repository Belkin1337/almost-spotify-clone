import { Typography } from "@/ui/typography";
import { MoveRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { useAddCreditsValue } from "@/components/forms/song/hooks/use-add-credits-value";
import { DeleteItemButton } from "@/ui/delete-item";

export const ArtistRoleSelect = () => {
	const { handleCreditsValues, deleteCreditItem, roles, songPreviewState } = useAddCreditsValue()
	const credits = songPreviewState?.credits;
	
	if (!roles || !credits) return;
	
	return credits.map((item, i) => (
			<div key={i} className="flex items-center gap-2">
				<DropdownMenu>
					{item.artist && <DeleteItemButton onClick={() => deleteCreditItem(item.artist!)}/>}
					<DropdownMenuTrigger className="px-3 py-1 rounded-md bg-neutral-700">
						<Typography size="medium" font="medium">
							{item.artist ? item.artist.name : 'Не выбран'}
						</Typography>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						{songPreviewState?.artists?.slice(0, 4).map(artist => (
							<div
								key={artist.id}
								className="flex items-center p-2 rounded-md hover:brightness-125 cursor-pointer"
								onClick={() => handleCreditsValues({ artist: artist, index: i })}
							>
								<Typography>{artist.name}</Typography>
							</div>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				<MoveRight size={18} className="text-neutral-400"/>
				<DropdownMenu>
					<DropdownMenuTrigger className="px-3 py-1 rounded-md bg-neutral-700">
						<Typography size="small" font="medium">
							{item.role ? item.role.name : 'Не выбрана.'}
						</Typography>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						{roles.map(role => (
							<DropdownMenuItem
								key={role.id}
								className="flex items-center !p-2 rounded-md hover:brightness-125 cursor-pointer"
								onClick={() => handleCreditsValues({
									role: role, index: i
								})}
							>
								<Typography>{role.name}</Typography>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		)
	)
}