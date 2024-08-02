"use client";

import { SidebarRoutes } from "./components/sidebar-routes";
import { UserEntity } from "@/types/user";
import { Wrapper } from "@/ui/wrapper";
import { SidebarWidgetList } from "../static/widget/components/sidebar-widget-list";
import { ImperativePanelHandle } from "react-resizable-panels"
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { memo, useEffect, useRef, useState } from "react";
import { useControlResizablePanels } from "@/lib/hooks/ui/use-control-resizable-panels";
import { useResizePanelsQuery } from "@/lib/query/ui/resize-panels-query";
import { ResizablePanel } from "@/ui/resizable";
import dynamic from "next/dynamic";
import { MAX_SIZE_SIDEBAR, MIN_SIZE_SIDEBAR, THRESHOLD_SIZE_SIDEBAR } from "@/lib/constants/ui/panels-sizes";

const SidebarLibrary = dynamic(() => import("@/components/sidebar/components/library/sidebar-library")
	.then(mod => mod.SidebarLibrary))

interface ISidebar {
	user: UserEntity,
	defaultSize: number | undefined;
}

export const Sidebar = memo(({
	user,
	defaultSize
}: ISidebar) => {
	const { data: resizeState } = useResizePanelsQuery()
	const ref = useRef<ImperativePanelHandle>(null);

	const [size, setSize] = useState<number>(defaultSize || 15);
	const { playerAttributes } = usePlayerStateQuery()
	const { updatePanelSizeMutation } = useControlResizablePanels()

	useEffect(() => {
		const panel = ref.current;

		if (panel) {
			const size = panel.getSize();

			if (size < THRESHOLD_SIZE_SIDEBAR && size !== 0) {
				panel.collapse();
			} else if (size === THRESHOLD_SIZE_SIDEBAR) {
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
					size: size,
					isCollapsed: panel.isCollapsed(),
					isExpanded: panel.isExpanded()
				}
			});
		}
	}, [
		size,
		resizeState.sidebarPanel.controlled,
		resizeState.sidebarPanel.isCollapsed,
		resizeState.sidebarPanel.isExpanded
	])

	const activePlayer = playerAttributes.active && user ? 'player_active' : 'player_no_active'

	return (
		<ResizablePanel
			id="sidebar"
			className="hidden md:block relative min-w-[64px] max-w-[620px]"
			collapsedSize={user ? MIN_SIZE_SIDEBAR : THRESHOLD_SIZE_SIDEBAR}
			collapsible={!!user}
			order={0}
			ref={ref}
			minSize={user ? MIN_SIZE_SIDEBAR : THRESHOLD_SIZE_SIDEBAR}
			maxSize={MAX_SIZE_SIDEBAR}
			defaultSize={defaultSize}
			onResize={(value: number) => setSize((prev) => value)}
		>
			<div className={`flex flex-col overflow-y-auto gap-y-2 rounded-lg panel	${activePlayer}`}>
				<SidebarRoutes/>
				<Wrapper variant="library">
					{user ? <SidebarLibrary/> : <SidebarWidgetList/>}
				</Wrapper>
			</div>
		</ResizablePanel>
	);
})

Sidebar.displayName = 'Sidebar'