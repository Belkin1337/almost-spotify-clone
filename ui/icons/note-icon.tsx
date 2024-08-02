import { Music4 } from "lucide-react"

const NOTE_ICON_SIZES = {
	mini: 18,
	medium: 26,
} as const;

type NoteIconType = keyof typeof NOTE_ICON_SIZES;

export const NoteIcon = ({
	type = 'mini'
}: {
	type?: NoteIconType
} ) => {
	const size = NOTE_ICON_SIZES[type];

	return <Music4 size={size} className="text-neutral-400"/>
}