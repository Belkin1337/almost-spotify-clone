import { Typography } from "@/ui/typography";
import { FaList } from "react-icons/fa";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/dropdown-menu";

export const LikedSongsSort = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex items-center gap-x-2">
				<Typography size="small">
					Date added
				</Typography>
				<FaList size={16}/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>

			</DropdownMenuContent>
		</DropdownMenu>
	)
}