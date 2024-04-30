import {
	FollowedTracksButton
} from "@/components/static/button/components/redirect-follow-button/components/redirect-follow-list-button";
import { MainPageSort } from "@/components/sections/main/components/sort/components/main-page-sort";

export default async function HomeMainSortPage() {
	return (
		<div className="flex flex-col gap-4 w-full">
			<MainPageSort/>
			<div className="grid grid-cols-4 gap-4 grid-rows-2">
				<FollowedTracksButton/>
			</div>
		</div>
	)
}