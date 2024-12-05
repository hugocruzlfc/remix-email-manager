import { Tags } from "@prisma/client";
import { z } from "zod";

export const addEmailFormSchema = z.object({
  body: z.string().min(1),
  from: z.string().email(),
  to: z.string().email(),
  subject: z.string().min(1),
  tag: z.nativeEnum(Tags),
});
