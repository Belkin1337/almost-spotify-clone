import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { AlbumEntity } from "@/types/album";

export const albumArtistVariants = cva("text-white truncate", {
	variants: {
		variant: {
			default: "text-small",
			player: "hover:underline hover:cursor-pointer text-small",
			widget: "hover:underline text-lg cursor-pointer font-medium",
			widget_title: "text-white font-bold hover:underline hover:cursor-pointer",
			album: "text-white text-xl font-bold hover:underline hover:cursor-pointer",
			page: "hover:underline hover:cursor-pointer text-small"
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

export interface IAlbumArtist
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof albumArtistVariants> {
	album: AlbumEntity
}