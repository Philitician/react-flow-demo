import { z } from "zod";

export const paramsSchema = z.object({
  id: z.coerce.number(),
});

export type Params = z.infer<typeof paramsSchema>;
