import Groq from "groq-sdk";
import { env } from "../config/env";
import { paperSchema, ParsedPaper } from "../utils/validators";

const client = new Groq({
  apiKey: env.groq.apiKey,
});

function extractJson(raw: string): string {
  const fenced = raw.match(/```json\s*([\s\S]*?)```/i);

  if (fenced) return fenced[1].trim();

  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");

  if (start >= 0 && end > start) {
    return raw.slice(start, end + 1);
  }

  return raw;
}

export async function generatePaper(
  prompt: string
): Promise<ParsedPaper> {
  let lastErr: unknown;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const completion =
        await client.chat.completions.create({
          model: env.groq.model,

          temperature: 0.4,

          max_tokens: 1800,

          response_format: {
            type: "json_object",
          },

          messages: [
            {
              role: "system",
              content:
                "You generate strictly valid JSON exam papers. Never output markdown or prose.",
            },

            {
              role: "user",
              content: prompt,
            },
          ],
        });

      const raw =
        completion.choices[0]?.message?.content ?? "";

      const jsonStr = extractJson(raw);

      const parsed = JSON.parse(jsonStr);

      const validated = paperSchema.parse(parsed);

      return validated;
    } catch (err) {
      lastErr = err;

      console.warn(
        `Groq generation attempt ${attempt} failed`,
        err
      );
    }
  }

  throw new Error(
    `Groq generation failed after retries: ${
      (lastErr as Error)?.message
    }`
  );
}