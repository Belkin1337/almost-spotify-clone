"use client"

import { ReactNode } from "react";
import { UserEntity } from "@/types/user";
import { Navbar } from "@/components/navbar/components/navbar";
import { useInView } from "react-intersection-observer";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { ResizablePanel } from "@/ui/resizable";

export const MainPanel = ({
	user,
	children
}: {
	user: UserEntity,
	children: ReactNode
}) => {
	const { playerAttributes } = usePlayerStateQuery()

	const { ref, inView } = useInView({
		threshold: 0
	});

	return (
		<ResizablePanel
			id="main_content"
			defaultSize={1260}
			order={1}
			className="relative md:w-[1280px] md:min-w-[980px] panel"
		>
			<div
				className={`${playerAttributes?.active && user ? 'player_active' : 'player_no_active'} overflow-y-auto bg-DARK_SECONDARY_BACKGROUND`}>
				<div ref={ref} className="h-[64px] w-full">
					<Navbar
						type={!inView ? "inView" : "noInView"}
						user={user}
						inView={inView}
					/>
				</div>
				<div className="relative -top-[64px] -mb-[64px]">
					{children}
				</div>
			</div>
		</ResizablePanel>
	);
}