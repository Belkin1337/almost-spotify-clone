"use client"

import { ResizableHandle, ResizablePanelGroup } from "@/ui/resizable";
import { Sidebar } from "@/components/sidebar/sidebar";
import { UserEntity } from "@/types/user";
import { MainPanel } from "@/components/layout/main-panel/main-panel";
import { SongWidget } from "@/components/layout/widget/song-widget";
import { ReactNode } from "react";
import { DEFAULT_SIZES_MAIN_LAYOUT } from "@/lib/constants/ui/panels-sizes";

export const RESIZABLE_COOKIE_ITEM = "react-resizable-panels:layout";

type MainResizableLayoutProps = {
	children: ReactNode,
	defaultLayout: number[] | undefined,
	user: UserEntity
}

export const MainResizableLayout = ({
	children, defaultLayout = DEFAULT_SIZES_MAIN_LAYOUT, user
}: MainResizableLayoutProps) => {
	const onLayout = (sizes: number[]) => {
		document.cookie = `${RESIZABLE_COOKIE_ITEM}=${JSON.stringify(sizes)}`;
	};

	return (
		<ResizablePanelGroup
			direction="horizontal"
			className="flex gap-1 p-1 bg-black"
			onLayout={onLayout}
		>
			<Sidebar user={user as UserEntity} defaultSize={defaultLayout[0]}/>
			<ResizableHandle withHandle/>
			<MainPanel user={user as UserEntity} defaultSize={defaultLayout[1]}>
				{children}
			</MainPanel>
			<SongWidget user={user as UserEntity} defaultSize={defaultLayout[2]}/>
		</ResizablePanelGroup>
	)
}