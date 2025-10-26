import z from "zod";

export const FileSchema = z.object({
  link: z.string().or(z.null()),
  text: z.string(),
});

export type TFile = z.infer<typeof FileSchema>;
