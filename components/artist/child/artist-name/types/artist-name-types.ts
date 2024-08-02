import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { ArtistEntity } from "@/types/artist";

export const artistNameVariants = cva("min-h-[18px]", {
	variants: {
		variant: {
			default: "hover:underline text-medium cursor-pointer text-white font-bold truncate",
			page: "text-white font-extrabold text-[82px]",
			select: "",
			search: "font-bold truncate text-medium"
		},
		type: {
			link: "hover:underline cursor-pointer"
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

type ArtistName = Pick<ArtistEntity, "id" | "name">

type RenamedArtist = {
	artistId: ArtistName["id"];
	artistName: ArtistName["name"];
};

export interface IArtistName
	extends HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof artistNameVariants>, RenamedArtist {}