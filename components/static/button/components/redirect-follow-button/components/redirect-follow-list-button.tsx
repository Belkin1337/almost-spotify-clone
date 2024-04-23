"use client"

import { FaPlay } from 'react-icons/fa';
import Image from "next/image";
import { Typography } from "@/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { Button } from "@/ui/button";
import { followed_songs } from "@/lib/constants/routes/routes";
import Link from "next/link";

export const FollowedTracksButton = () => {
	const configLocale = useScopedI18n('main-service.pages.liked-content.navbar')

	return (
		<Link href={followed_songs}>
			<Button
				variant="media_item"
				className="relative group items-center gap-x-4 pr-4"
				rounded="medium"
				padding="none"
			>
				<div className="relative min-h-[64px] min-w-[64px]">
					<Image
						className="object-cover rounded-md"
						fill
						loading="lazy"
						src="/images/liked.png"
						alt={configLocale('subtitle-message')}
					/>
				</div>
				<Typography className="truncate py-5" font="semibold" text_color="white">
					{configLocale('subtitle-message')}
				</Typography>
				<div
					className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-MAIN p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-105">
					<FaPlay className="text-black"/>
				</div>
			</Button>
		</Link>
	);
}