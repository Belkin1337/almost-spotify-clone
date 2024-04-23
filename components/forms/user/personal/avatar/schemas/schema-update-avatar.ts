import { z } from "zod"

export const updateAvatarSchema = z.object({
  avatar: z.any()
}).required()