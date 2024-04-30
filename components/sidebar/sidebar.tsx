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

const SidebarLibrary = dynamic(() => import("@/components/sidebar/components/library/sidebar-library")
	.then(mod => mod.SidebarLibrary))

export const Sidebar = memo(({
	user
}: {
	user: UserEntity
}) => {
	const { data: resizeState } = useResizePanelsQuery()
	const [size, setSize] = useState<number>(resizeState.sidebarPanel.size || 18);
	const ref = useRef<ImperativePanelHandle>(null);

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
			collapsedSize={user ? 4 : 18}
			collapsible={!!user}
			order={0}
			ref={ref}
			minSize={user ? 4 : 18}
			maxSize={33}
			defaultSize={270}
			onResize={(size: number) => {
				setSize(size)
			}}
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