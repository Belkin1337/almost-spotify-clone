"use client"

import { UserEntity } from "@/types/user";
import { SongWidgetItem } from "@/components/widget/components/song/components/song-widget-item";
import { useWidget } from "@/lib/hooks/ui/use-widget";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { ResizableHandle, ResizablePanel } from "@/ui/resizable";

interface ISongWidget {
	user: UserEntity,
	defaultSize: number | undefined
}

export const SongWidget = ({
	user, defaultSize
}: ISongWidget) => {
	const { widgetState } = useWidget();
	const { playerAttributes } = usePlayerStateQuery()

	const isSongWidgetVisible = widgetState.data.isOpen;
	const activeSong = playerAttributes?.active;

	if (!user || !activeSong) return null;

	return (
		isSongWidgetVisible && activeSong && (
			<>
				<ResizableHandle withHandle/>
				<ResizablePanel
					id="widget_view"
					defaultSize={defaultSize}
					order={2}
					className="hidden md:block md:max-w-[462px] md:w-[462px] md:min-w-[342px] panel"
				>
					<SongWidgetItem/>
				</ResizablePanel>
			</>
		)
	)
}