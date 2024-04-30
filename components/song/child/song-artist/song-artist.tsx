import { Fragment, HTMLAttributes } from "react"
import { artist_route_profile } from "@/lib/constants/routes/routes"
import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { cva, VariantProps } from "class-variance-authority"
import { SongEntity } from "@/types/song"
import { FaCircle } from "react-icons/fa"
import { SkeletonArtistName } from "@/components/skeletons/song/skeleton-song-artist"
import { SkeletonSongImage } from "@/components/skeletons/song/skeleton-song-image"
import Image from "next/image"
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";
import Link from "next/link";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";

const songAuthorVariants = cva("text-neutral-400 truncate", {
	variants: {
		variant: {
			default: "hover:underline hover:cursor-pointer text-sm",
			player: "hover:underline hover:cursor-pointer text-sm",
			widget: "hover:underline text-lg cursor-pointer font-medium",
			widget_title: "text-white !font-bold hover:underline hover:cursor-pointer",
			page: "hover:underline hover:cursor-pointer text-sm"
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

interface ISongArtist
	extends HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof songAuthorVariants> {
	song: SongEntity
}

export const SongArtist = ({
	variant,
	className,
	song
}: ISongArtist) => {
	const { data, isFetching } = useSongArtistListQuery(song.id)

	const artists = data?.artists;
	const firstArtist = data?.firstArtist;

	const { data: image } = useLoadImage(firstArtist?.avatar_path || nullAvatarImage);

	if (!artists) return;

	return (
		<>
			{variant === 'page' && (
				<div className="rounded-full overflow-hidden w-[26px] h-[26px]">
					{isFetching ? (
						<SkeletonSongImage/>
					) : (
						<Image
							src={image?.url as string}
							alt={firstArtist ? firstArtist.name : ''}
							title={firstArtist ? firstArtist.name : ''}
							width={40}
							height={40}
							className="object-cover w-[26px] h-[26px]"
							loading="lazy"
						/>
					)}
				</div>
			)}
			<div className="flex items-center gap-1">
				{isFetching ? (
					<SkeletonArtistName/>
				) : (
					artists?.map((artist,
						idx) => (
						<Fragment key={artist.id}>
							<Link href={`${artist_route_profile}/${artist.id}`}>
								<p
									key={artist.id}
									className={songAuthorVariants(({ variant, className }))}
								>
									{artist.name}
									{(idx !== artists.length - 1 && variant !== 'page') && (
										<span className="text-neutral-400">,</span>
									)}
								</p>
							</Link>
							{variant === 'page' && (
								<FaCircle size={4} className="fill-white"/>
							)}
						</Fragment>
					))
				)}
			</div>
		</>
	)
}