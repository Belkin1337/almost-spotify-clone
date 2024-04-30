"use client"

import { ColoredBackground } from "@/ui/colored-background";
import { useGenreQuery } from "@/lib/query/genre/genre-query";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import { Typography } from "@/ui/typography";
import { Wrapper } from "@/ui/wrapper";

export const GenrePageItem = ({
	genreId
}: {
	genreId: string
}) => {
	const { data: genre } = useGenreQuery(genreId);
	const { data: imageUrl } = useLoadImage(genre?.icon || nullAvatarImage);

	if (!genreId) return;

	return (
		<Wrapper variant="page">
			<ColoredBackground imageUrl={imageUrl?.url}	/>
			<div className="flex flex-col relative p-6 h-[212px] justify-end">
				<Typography font="bold" className="text-7xl">
					{genre?.name}
				</Typography>
			</div>
		</Wrapper>
	)
}