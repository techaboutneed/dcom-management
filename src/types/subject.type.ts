import z from "zod";
import { FileSchema } from "./file.type";

export const SubjectSchema = z.object({
  subject: z.string(),
  files: z.array(FileSchema).or(z.null()),
});

export type TSubject = z.infer<typeof SubjectSchema>;
