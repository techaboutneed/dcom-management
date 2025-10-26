import z from "zod";
import { SubjectSchema } from "./subject.type";

export const SyllabusSchema = z.object({}).and(SubjectSchema);

export type TSyllabus = z.infer<typeof SyllabusSchema>;
