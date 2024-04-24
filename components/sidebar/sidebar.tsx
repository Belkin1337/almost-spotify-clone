"use client";

import { SidebarRoutes } from "./components/sidebar-routes";
import { UserEntity } from "@/types/user";
import { Wrapper } from "@/ui/wrapper";
import { SidebarWidgetList } from "../static/widget/components/sidebar-widget-list";
import { ImperativePanelHandle, Panel } from "react-resizable-panels"
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { memo, useEffect, useRef, useState } from "react";
import { useControlResizablePanels } from "@/lib/hooks/ui/use-control-resizable-panels";
import dynamic from "next/dynamic";
import { useResizePanelsQuery } from "@/lib/query/ui/resize-panels-query";

const SidebarLibrary = dynamic(() => import("@/components/sidebar/components/library/sidebar-library")
	.then(mod => mod.SidebarLibrary))

export const Sidebar = memo(({
	user
}: {
	user: UserEntity
}) => {
	const [size, setSize] = useState<number>(0);
	const ref = useRef<ImperativePanelHandle>(null);
	const { data: resizeState } = useResizePanelsQuery()

	const { playerAttributes } = usePlayerStateQuery()
	const { updatePanelSizeMutation } = useControlResizablePanels()

	useEffect(() => {
		const panel = ref.current;

		if (panel) {
			if (size < 18 && size !== 0) {
				panel.collapse();
			} else if (size === 18) {
				panel.expand();
			}

			if (resizeState.sidebarPanel.controlled) {
				if (resizeState.sidebarPanel.isCollapsed) {
					panel.collapse()
				} else if (resizeState.sidebarPanel.isExpanded) {
					panel.expand()
				}
			}
			
			updatePanelSizeMutation.mutate({
				sidebarPanel: {
					isCollapsed: panel.isCollapsed(),
					isExpanded: panel.isExpanded()
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [size, resizeState.sidebarPanel.controlled])

	return (
		<Panel
			id="sidebar"
			collapsedSize={4}
			collapsible
			ref={ref}
			maxSize={33}
			defaultSize={270}
			onResize={(size: number) => setSize(size)}
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