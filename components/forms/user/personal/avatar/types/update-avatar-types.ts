import { z } from "zod";
import { updateAvatarSchema } from "@/components/forms/user/personal/avatar/schemas/schema-update-avatar";

export type zodAvatarSchema = z.infer<typeof updateAvatarSchema>