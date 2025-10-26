import z from "zod";
import { SubjectSchema } from "./subject.type";

export const NoteSchema = z
  .object({ ref: z.string().or(z.undefined()) })
  .and(SubjectSchema);

export type TNote = z.infer<typeof NoteSchema>;
