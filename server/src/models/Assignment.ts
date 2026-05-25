import { Schema, model, InferSchemaType } from "mongoose";

const QuestionSchema = new Schema(
  {
    text: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
    marks: { type: Number, required: true },
    type: { type: String, required: true },
  },
  { _id: false }
);

const SectionSchema = new Schema(
  {
    title: String,
    instruction: String,
    questions: [QuestionSchema],
  },
  { _id: false }
);

const PaperSchema = new Schema(
  {
    title: String,
    sections: [SectionSchema],
  },
  { _id: false }
);

const AssignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    dueDate: { type: Date, required: true },
    sourceText: { type: String, default: "" },
    config: {
      questionTypes: [String],
      numberOfQuestions: Number,
      totalMarks: Number,
      difficulty: {
        easy: Number,
        medium: Number,
        hard: Number,
      },
      instructions: String,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    generatedPaper: { type: PaperSchema, default: null },
    pdfBuffer: { type: Buffer, default: null },
    jobId: String,
    error: String,
  },
  { timestamps: true }
);

export type AssignmentDoc = InferSchemaType<typeof AssignmentSchema>;
export const Assignment = model("Assignment", AssignmentSchema);