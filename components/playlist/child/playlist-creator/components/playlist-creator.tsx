import { Typography } from "@/ui/typography";
import { PlaylistEntity } from "@/types/playlist";
import { useUserByIdQuery } from "@/lib/query/user/user-id-query";
import Image from "next/image";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import Link from "next/link";
import { profile_route } from "@/lib/constants/routes/routes";

export const PlaylistCreator = ({
	playlist
}: {
	playlist: PlaylistEntity
}) => {
	const { data: playlistCreator } = useUserByIdQuery(playlist.user_id);
	const { data: image } = useLoadImage(playlistCreator?.avatar_url, "users");

	if (!playlist || !playlistCreator) return;

	return (
		<div className="flex items-center gap-x-2">
			<Image
				src={image?.url as string}
				alt={playlistCreator.full_name!}
				title={playlistCreator.full_name!}
				width={40}
				height={40}
				className="object-cover w-[26px] h-[26px] rounded-full"
				loading="lazy"
			/>
			<Link href={profile_route(playlistCreator.id)}>
				<Typography variant="link" font="semibold" size="small">
					{playlistCreator.full_name}
				</Typography>
			</Link>
		</div>
	)
}