import { AssignmentInput } from "../utils/validators";

export function buildPrompt(input: AssignmentInput): string {
  const { title, subject, config, sourceText } = input;
  const { easy, medium, hard } = config.difficulty;

  return `
You are an expert academic question-paper generator.

TASK:
Generate a structured exam paper as STRICT JSON ONLY.
No prose. No markdown. No code fences. Just valid JSON.

EXPECTED JSON SHAPE:
{
  "title": "string",
  "sections": [
    {
      "title": "Section A",
      "instruction": "string",
      "questions": [
        { "text": "string", "difficulty": "easy|medium|hard", "marks": number, "type": "string" }
      ]
    }
  ]
}

REQUIREMENTS:
- Title: "${title}"
- Subject: "${subject}"
- Total questions: ${config.numberOfQuestions}
- Total marks: ${config.totalMarks}
- Question types allowed: ${config.questionTypes.join(", ")}
- Difficulty distribution (approx %): easy=${easy}, medium=${medium}, hard=${hard}
- Group questions logically into Sections A, B, C if needed.
- Each section has an "instruction" line (e.g. "Attempt all questions").
- Marks per question must sum to ${config.totalMarks}.
- Additional instructions: ${config.instructions || "None"}

${sourceText ? `REFERENCE MATERIAL:\n${sourceText.slice(0, 4000)}` : ""}

Return ONLY the JSON object.
  `.trim();
}