export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  text: string;
  difficulty: Difficulty;
  marks: number;
  type: string;
}

export interface Section {
  title: string;
  instruction: string;
  questions: Question[];
}

export interface GeneratedPaper {
  title: string;
  sections: Section[];
}

export interface Assignment {
  _id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "processing" | "completed" | "failed";
  config: {
    questionTypes: string[];
    numberOfQuestions: number;
    totalMarks: number;
    difficulty: { easy: number; medium: number; hard: number };
    instructions?: string;
  };
  generatedPaper: GeneratedPaper | null;
  error?: string;
  createdAt: string;
}