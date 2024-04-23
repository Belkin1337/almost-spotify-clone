import { UserTips } from "@/components/tooltip/components/action";
import { IoCheckmarkCircle } from "react-icons/io5";
import { LuPlusCircle } from "react-icons/lu";
import { Button } from "@/ui/button";
import React from "react";

export const AlbumFollowButton = () => {
	return (
		<Button
			// disabled={followMutation.isPending}
			// onClick={handleLike}
			align="centered"
			className="hover:scale-[1.04]"
		>
			{/*{followedSong?.data?.song_id === songId ? (*/}
			{/*	<UserTips action="Удалить из любимых треков">*/}
			{/*		<IoCheckmarkCircle*/}
			{/*			size={variant?.page ? 44 : 22}*/}
			{/*			className="text-jade-400"*/}
			{/*		/>*/}
			{/*	</UserTips>*/}
			{/*) : (*/}
			{/*	<UserTips action="Добавить в любимые треки">*/}
			{/*		<LuPlusCircle*/}
			{/*			className={`${variant?.page && "text-neutral-400"}`}*/}
			{/*			size={variant?.page ? 44 : 22}*/}
			{/*		/>*/}
			{/*	</UserTips>*/}
			{/*)}*/}
		</Button>
	)
}