import { Typography } from "@/ui/typography";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { ArtistImage } from "@/components/artist/child/artist-image/components/artist-image";
import { ArtistName } from "@/components/artist/child/artist-name/components/artist-name";
import { Check } from "lucide-react";
import {
	OrderType,
	SONGS_ORDER_TYPE_LIST,
	SONGS_SORT_TYPE_LIST,
	SONGS_VIEW_TYPE_LIST,
	SongsType,
	ViewType
} from "@/lib/constants/ui/sort-songs";
import { IUserTracksList } from "@/components/user/components/for-authors/user-tracks/types/user-tracks-types";
import { CheckedIcon } from "@/ui/icons/checked";

export const UserTracksSort = ({
	artists, sortType, handleSort
}: IUserTracksList) => {
	return (
		<>
			<Typography className="m-2" text_color="gray" size="small" font="semibold">
				Фильтировать по
			</Typography>
			{SONGS_SORT_TYPE_LIST.map(item => (
				<div
					key={item.type}
					className="flex p-2 items-center justify-between hover:bg-neutral-800 w-full rounded-md"
				>
					{item.type as SongsType === 'by_artist' ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-start w-full">
								<Typography className={item.type as SongsType === sortType.songsType ? 'text-jade-500' : 'text-white'}>
									{item.name}
								</Typography>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="relative right-[280px] top-[10px]">
								{artists?.map((artist) => (
									<div
										key={artist.id}
										className="flex items-center gap-x-2 rounded-md p-2 w-full hover:bg-neutral-800"
										onClick={() => {
											handleSort("setArtist", artist.id);
											handleSort('songsType', item.type as SongsType)
										}}
									>
										<ArtistImage
											variant="select"
											artist={artist}
										/>
										<ArtistName
											variant="select"
											artistName={artist.name}
											artistId={artist.id}
											className={`${sortType.selectedArtistId === artist.id && 'text-jade-500'}`}
										/>
									</div>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<div className="w-full">
							<Typography
								className={item.type as SongsType === sortType.songsType ? 'text-jade-500' : 'text-white'}
								onClick={() => {
									handleSort("setArtist", "");
									handleSort('songsType', item.type as SongsType);
								}}
							>
								{item.name}
							</Typography>
						</div>
					)}
					{item.type as SongsType === sortType.songsType && <Check size={18} className="text-jade-500"/>}
				</div>
			))}
			<DropdownMenuSeparator/>
			<Typography className="m-2" font="semibold" text_color="gray" size="small">
				Сортировать по
			</Typography>
			{SONGS_ORDER_TYPE_LIST.map(item => (
				<div
					key={item.type}
					className="flex p-2 justify-between items-center hover:bg-neutral-800 w-full rounded-md"
					onClick={() => handleSort('orderType', item.type as OrderType)}
				>
					<Typography className={item.type as OrderType === sortType.orderType ? '!text-jade-500' : 'text-white'}>
						{item.name}
					</Typography>
					{item.type as OrderType === sortType.orderType && <CheckedIcon/>}
				</div>
			))}
			<DropdownMenuSeparator/>
			<Typography className="m-2" size="small" font="semibold" text_color="gray">Вид</Typography>
			{SONGS_VIEW_TYPE_LIST.map(item => (
				<div
					key={item.type}
					onClick={() => handleSort('viewType', item.type as ViewType)}
					className="flex justify-between items-center p-2 hover:bg-neutral-800 w-full rounded-md"
				>
					<div className="flex gap-x-2 items-center">
						{item.icon && item.icon()}
						<Typography className={`${sortType.viewType === item.type ? 'text-jade-500' : 'text-white'}`}>
							{item.name}
						</Typography>
					</div>
					{item.type as ViewType === sortType.viewType && <CheckedIcon/>}
				</div>
			))}
		</>
	)
}