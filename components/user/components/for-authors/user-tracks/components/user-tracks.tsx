"use client"

import { Input } from "@/ui/input";
import { Typography } from "@/ui/typography";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { OrderType, SONGS_VIEW_TYPE_LIST, SongsType, ViewType } from "@/lib/constants/ui/sort-songs";
import { Wrapper } from "@/ui/wrapper";
import { useUserSongsQuery } from "@/lib/query/user/user-songs-query";
import { useUserArtistListQuery } from "@/lib/query/user/user-artists-list-query";
import { UserTracksSort } from "@/components/user/components/for-authors/user-tracks/components/user-tracks-sort";
import { UserTracksList } from "@/components/user/components/for-authors/user-tracks/components/user-tracks-list";
import { ItemLoader } from "@/ui/item-loader";
import { SortType } from "@/components/user/components/for-authors/user-tracks/types/user-tracks-types";

export const UserTracks = ({
	userId
}: {
	userId: string
}) => {
	const [isOpenInput, setIsOpenInput] = useState(false);

	const [sortType, setSortType] = useState<SortType>({
		viewType: "compact",
		orderType: "from_the_end",
		songsType: "all",
		selectedArtistId: ""
	})

	const searchRef = useRef<HTMLDivElement>(null);

	const { data: userSongs, isLoading, isPending, refetch } = useUserSongsQuery(userId, sortType, sortType.songsType);
	const { data: artists } = useUserArtistListQuery(userId, sortType.songsType)

	const handleSort = useCallback((
		type: 'orderType' | 'viewType' | 'songsType' | "setArtist",
		value: OrderType | ViewType | SongsType | string
	) => {
		switch (type) {
			case 'orderType':
				setSortType({
					...sortType,
					orderType: value as OrderType
				});

				refetch();
				break;
			case 'viewType':
				setSortType({
					...sortType,
					viewType: value as ViewType
				});
				break;
			case 'songsType':
				setSortType({
					...sortType,
					songsType: value as SongsType
				});
				refetch()

				break;
			case 'setArtist':
				setSortType({
					...sortType,
					selectedArtistId: value
				});
				refetch()

				break;
			default:
				break;
		}
	}, [sortType]);

	useEffect(() => {
		console.log(sortType.selectedArtistId)
	}, [sortType])

	if (!userId) return;

	return (
		<Wrapper variant="page" className="gap-y-8">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center gap-x-4 overflow-hidden">
					<div
						onClick={() => setIsOpenInput(!isOpenInput)}
						className={`hover:bg-neutral-700/60 cursor-pointer p-1 rounded-full flex items-center justify-center 
            ${isOpenInput ? 'hidden' : 'transition'}`}
					>
						<BiSearch size={26}/>
					</div>
					<div
						ref={searchRef}
						className={`flex items-center bg-neutral-700/50 pl-2 pr-1 py-1 rounded-md 
            ${isOpenInput ? 'animate-slide-out' : 'animate-slide-in transition delay-600 ease-in-out hidden'}`}
					>
						<BiSearch size={26}/>
						<Input
							name="search_followed"
							className="h-[32px] bg-transparent"
							placeholder="Search in playlist"
						/>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger className="flex flex-col self-end">
						<div className="flex items-center gap-4">
							<Typography>
								Недавние
							</Typography>
							{SONGS_VIEW_TYPE_LIST.find(item => item.type === sortType.viewType)?.icon()}
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="flex flex-col items-start w-[280px] right-6 top-2 relative">
						<UserTracksSort
							artists={artists!}
							isLoading={isLoading}
							sortType={sortType}
							handleSort={handleSort}
						/>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			{isPending && (
				<ItemLoader />
			)}
			<UserTracksList
				isLoading={isLoading}
				sortType={sortType}
				userSongs={userSongs}
			/>
		</Wrapper>
	)
}