import { Badge } from "@/ui/badge";
import { Typography } from "@/ui/typography";

const NAVIGATION_TYPES_LIST = [
	{
		name: "All"
	},
	{
		name: "Songs"
	},
	{
		name: "Albums"
	},
	{
		name: "Artists"
	},
	{
		name: "Playlists"
	},
	{
		name: "Profiles"
	}
]

export const SearchNavigationBar = () => {
	return (
		<div className="flex items-center gap-2 w-full">
			{NAVIGATION_TYPES_LIST.map((item, idx) => (
				<Badge key={idx}>
					<Typography>{item.name}</Typography>
				</Badge>
			))}
		</div>
	)
}