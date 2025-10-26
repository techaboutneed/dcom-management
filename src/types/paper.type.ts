import z from "zod";
import { SubjectSchema } from "./subject.type";

export const PaperSchema = z.object({}).and(SubjectSchema);

export type TPaper = z.infer<typeof PaperSchema>;
