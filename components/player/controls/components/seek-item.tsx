import { Typography } from "@/ui/typography";
import { durationConverter } from "@/lib/tools/duration-converter";
import { useAudioStateQuery } from "@/lib/query/player/audio-state-query";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { SeekSlider } from "@/components/player/controls/components/seek-slider";

export const SeekItem = () => {
	const { playerAttributes } = usePlayerStateQuery()

	const raw = playerAttributes.duration || 0;
	// const formatted = durationConverter(raw);
	const { audioAttributes } = useAudioStateQuery();

	const position = audioAttributes?.position;

	const currentDuration = durationConverter(raw);
	const displayPosition = durationConverter(position!)

	return (
		<div className="flex items-center gap-x-2 w-full">
			<Typography text_color="gray" className="text-[12px]" font="medium">
				{displayPosition}
			</Typography>
			<SeekSlider max={raw || 1} value={position || 0}/>
			<Typography text_color="gray" className="text-[12px]" font="medium">
				{currentDuration}
			</Typography>
		</div>
	)
}