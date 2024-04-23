"use client";

import { SidebarRoutes } from "./components/sidebar-routes";
import { UserEntity } from "@/types/user";
import { Wrapper } from "@/ui/wrapper";
import { SidebarWidgetList } from "../static/widget/components/sidebar-widget-list";
import { ImperativePanelHandle, Panel } from "react-resizable-panels"
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { memo, useCallback, useEffect, useRef } from "react";
import { useControlResizablePanels } from "@/lib/hooks/ui/use-control-resizable-panels";
import dynamic from "next/dynamic";

const SidebarLibrary = dynamic(() => import("@/components/sidebar/components/library/sidebar-library")
	.then(mod => mod.SidebarLibrary))

export const Sidebar = memo(({
	user
}: {
	user: UserEntity
}) => {
	const ref = useRef<ImperativePanelHandle>(null);
	const { playerAttributes } = usePlayerStateQuery()
	const { updatePanelSizeMutation } = useControlResizablePanels()

	console.log("render") // infinity re-renders

	const mutateAttributes = useCallback((
		panel: ImperativePanelHandle
	) => {
		const currentId = panel.getId();
		const currentSize = panel.getSize()

		if (panel) {
			updatePanelSizeMutation.mutate({
				sidebarPanel: {
					id: currentId,
					size: currentSize
				}
			});
		}
	}, [updatePanelSizeMutation])

	const resizeSidebar = useCallback((
		panel: ImperativePanelHandle
	) => {
		if (panel) {
			const currentSize = panel.getSize()

			if (currentSize < 17) {
				panel.resize(4);
			} else if (currentSize >= 17 && currentSize < 17.4) {
				panel.resize(17.8);
			}
		}
	}, [])

	useEffect(() => {
		const panel = ref.current;

		if (panel) {
			resizeSidebar(panel)
			mutateAttributes(panel)
		}
	}, [mutateAttributes, resizeSidebar]);

	return (
		<Panel
			id="sidebar"
			collapsedSize={33}
			ref={ref}
			maxSize={33}
			defaultSize={270}
			className="hidden md:block relative min-w-[64px] max-w-[620px]"
		>
			<div className={`flex flex-col overflow-y-auto gap-y-2 rounded-lg 
				${playerAttributes?.active && user ? 'player_active' : 'player_no_active'}`}
			>
				<SidebarRoutes/>
				<Wrapper variant="library">
					{user ? <SidebarLibrary/> : <SidebarWidgetList/>}
				</Wrapper>
			</div>
		</Panel>
	);
})
Sidebar.displayName = 'Sidebar'