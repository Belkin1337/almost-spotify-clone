import { z } from "zod";
import { updateNameSchema } from "@/components/forms/user/personal/name/schemas/schema-update-name";

export type UpdateAttributesType = {
	full_name?: string,
	userId?: string;
	avatarUrl?: any;
};

export type zodNameSchema = z.infer<typeof updateNameSchema>