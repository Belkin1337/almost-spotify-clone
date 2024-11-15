import { Typography } from "@/ui/typography";
import { GenreType } from "@/lib/constants/shared/genres-list";
import Link from "next/link";
import { genre_route } from "@/lib/constants/routes/routes";
import { useGrid } from "@/lib/hooks/ui/use-grid";

type SearchGenresListProps = {
	genres: GenreType[]
}

export const SearchGenresList = ({
	genres
}: SearchGenresListProps) => {
	const { cols } = useGrid()
	
	return (
		<div
			className="grid grid-rows-8 gap-6"
			style={{
				gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
			}}
		>
			{genres.map((genre,
				idx) => (
				<Link
					key={idx}
					href={`${genre_route(genre.id)}`}
					className="flex items-start cursor-pointer relative w-[170px] h-[170px] bg-violet-500 overflow-hidden rounded-md p-4"
				>
					<Typography text_color="white" size="xl" font="bold">
						{genre.name}
					</Typography>
				</Link>
			))}
		</div>
	)
}