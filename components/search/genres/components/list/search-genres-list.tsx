import { Typography } from "@/ui/typography";
import { GenreType } from "@/lib/constants/shared/genres-list";
import Link from "next/link";
import { genre_route } from "@/lib/constants/routes/routes";

export const SearchGenresList = ({
	genres
}: {
	genres: GenreType[]
}) => {
	return (
		<div className="flex flex-wrap overflow-hidden gap-6">
			{genres.map((genre,
				idx) => (
				<Link
					key={idx}
					href={`${genre_route(genre.id)}`}
					className="flex items-start cursor-pointer relative w-fit min-w-[231.5px] h-[231.5px] bg-violet-500 overflow-hidden rounded-md p-4"
				>
					<Typography text_color="white" size="xl" font="bold">
						{genre.name}
					</Typography>
				</Link>
			))}
		</div>
	)
}