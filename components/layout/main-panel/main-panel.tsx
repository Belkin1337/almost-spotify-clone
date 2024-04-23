"use client"

import React, { ReactNode } from "react";
import { UserEntity } from "@/types/user";
import { Navbar } from "@/components/layout/main-panel/navbar/components/navbar";
import { useInView } from "react-intersection-observer";
import { ResizablePanel } from "@/ui/resizable";
import { CalcHeight } from "@/lib/utils/styles/calc-height";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";

export const MainPanel = ({
	user,
	children
}: {
	user: UserEntity,
	children: ReactNode
}) => {
	const { playerAttributes } = usePlayerStateQuery()
	const { height } = CalcHeight()

	const { ref, inView } = useInView({
		threshold: 0
	});

	return (
		<ResizablePanel defaultSize={1260} className="relative md:w-[1280px] md:min-w-[980px]">
			<div
				className={`${playerAttributes?.active && user ? 'player_active' : 'player_no_active'} overflow-y-auto bg-DARK_SECONDARY_BACKGROUND`}>
				<div
					ref={ref}
					className="h-[64px] w-full"
				>
					<Navbar user={user} inView={inView}/>
				</div>
				<div className="relative -top-[64px] -mb-[64px]">
					{children}
				</div>
			</div>
		</ResizablePanel>
	);
}