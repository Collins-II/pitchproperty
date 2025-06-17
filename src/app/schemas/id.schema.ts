import { z } from "zod";

export const validateIdSchema = z.object({ id: z.string() });
