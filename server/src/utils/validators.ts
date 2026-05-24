import { z } from "zod";

export const assignmentInputSchema = z.object({
  title: z.string().min(3),
  subject: z.string().min(2),
  dueDate: z.string().refine((v) => !isNaN(Date.parse(v))),
  sourceText: z.string().optional().default(""),
  config: z.object({
    questionTypes: z.array(z.string()).min(1),
    numberOfQuestions: z.number().int().positive().max(100),
    totalMarks: z.number().int().positive().max(500),
    difficulty: z.object({
      easy: z.number().min(0).max(100),
      medium: z.number().min(0).max(100),
      hard: z.number().min(0).max(100),
    }),
    instructions: z.string().optional().default(""),
  }),
});

export const paperSchema = z.object({
  title: z.string(),
  sections: z
    .array(
      z.object({
        title: z.string(),
        instruction: z.string(),
        questions: z
          .array(
            z.object({
              text: z.string(),
              difficulty: z.enum(["easy", "medium", "hard"]),
              marks: z.number().int().positive(),
              type: z.string(),
            })
          )
          .min(1),
      })
    )
    .min(1),
});

export type AssignmentInput = z.infer<typeof assignmentInputSchema>;
export type ParsedPaper = z.infer<typeof paperSchema>;