import { Fragment } from "react"
import { artist_route_profile } from "@/lib/constants/routes/routes"
import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { FaCircle } from "react-icons/fa"
import { SkeletonArtistName } from "@/components/skeletons/song/skeleton-song-artist"
import { SkeletonSongImage } from "@/components/skeletons/song/skeleton-song-image"
import Image from "next/image"
import Link from "next/link";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import { Skeleton } from "@/ui/skeleton";
import { ISongArtist, songAuthorVariants } from "@/components/song/child/song-artist/types/song-artist-types";

export const SongArtist = ({
	variant,
	className,
	artists,
	firstArtist,
	isLoading,
}: ISongArtist) => {
	const { data: image } = useLoadImage(firstArtist?.avatar_path || nullAvatarImage);

	if (isLoading) return <Skeleton className="h-[22px] w-[68px] bg-neutral-700 rounded-md" />

	if (!artists) return;

	return (
		<>
			{variant === 'page' && (
				<div className="rounded-full overflow-hidden w-[26px] h-[26px]">
					{isLoading ? (
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
				{isLoading ? (
					<SkeletonArtistName/>
				) : (
					artists?.map((artist,
						idx) => (
						<Fragment key={artist.id}>
							<Link href={artist_route_profile(artist?.id)}>
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