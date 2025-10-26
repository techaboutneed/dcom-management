import z from "zod";
import { NoteSchema } from "./note.type";
import { PaperSchema } from "./paper.type";
import { SyllabusSchema } from "./syllabus.type";

export const SemesterSchema = z.object({
  note: NoteSchema.array(),
  paper: PaperSchema.array(),
  syllabus: SyllabusSchema.array(),
});

export type TSemester = z.infer<typeof SemesterSchema>;
