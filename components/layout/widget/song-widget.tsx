"use client"

import { UserEntity } from "@/types/user";
import { SongWidgetItem } from "@/components/widget/components/song/components/song-widget-item";
import { useWidget } from "@/lib/hooks/ui/use-widget";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { ResizablePanel } from "@/ui/resizable";

export const SongWidget = ({
	user
}: {
	user: UserEntity
}) => {
	const { widgetState } = useWidget();
	const { playerAttributes } = usePlayerStateQuery()

	const isSongWidgetVisible = widgetState.data.isOpen;
	const activeSong = playerAttributes?.active;

	if (!user || !activeSong) return null;

	return (
		isSongWidgetVisible && activeSong && (
			<ResizablePanel
				id="widget_view"
				defaultSize={462}
				order={2}
				className="hidden md:block md:max-w-[462px] md:w-[462px] md:min-w-[342px] panel"
			>
				<SongWidgetItem/>
			</ResizablePanel>
		)
	)
}