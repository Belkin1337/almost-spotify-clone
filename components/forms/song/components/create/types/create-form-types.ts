import { z } from "zod";
import { songSchema } from "@/components/forms/song/schemas/schema-song";

export type zodSongSchema = z.infer<typeof songSchema>