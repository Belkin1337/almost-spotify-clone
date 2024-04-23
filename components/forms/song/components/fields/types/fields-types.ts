import { z } from "zod";
import { songSchema } from "@/components/forms/song/schemas/schema-song";
import { UseFormReturn } from "react-hook-form";
import { SongEntity } from "@/types/song";
import { MutableRefObject } from "react";

export type createSchema = z.infer<typeof songSchema>

export type SongFormFieldType = "create" | "edit"

export interface IFormFields {
	form: UseFormReturn<createSchema>,
	isLoading: boolean,
	type: SongFormFieldType,
	song?: SongEntity,
	refs?: {
		imageRef?: MutableRefObject<HTMLInputElement | null>,
		songRef?: MutableRefObject<HTMLInputElement | null>
	},
}