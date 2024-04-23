import { HTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";

interface ArtistAboutItem
	extends HTMLAttributes<HTMLDivElement> {
}

export const ArtistAboutItem = ({ ...props }: ArtistAboutItem) => {
	return (
		<div
			className="flex relative items-end min-h-[580px] w-[850px] bg-no-repeat bg-cover rounded-md hover:scale-[1.012] transition ease-in
			duration-300 hover:duration-300 p-12"
			{...props}
		/>
	)
}