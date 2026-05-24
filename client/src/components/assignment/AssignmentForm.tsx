"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { QuestionConfig } from "./QuestionConfig";
import { FileUpload } from "./FileUpload";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const schema = z
  .object({
    title: z.string().min(3, "Title is required"),
    subject: z.string().min(2, "Subject is required"),
    dueDate: z.string().min(1, "Due date required"),
    questionTypes: z.array(z.string()).min(1, "Pick at least one type"),
    numberOfQuestions: z.coerce.number().int().positive().max(100),
    totalMarks: z.coerce.number().int().positive().max(500),
    easy: z.coerce.number().min(0).max(100),
    medium: z.coerce.number().min(0).max(100),
    hard: z.coerce.number().min(0).max(100),
    instructions: z.string().optional(),
  })
  .refine((d) => d.easy + d.medium + d.hard === 100, {
    message: "Difficulty must total 100%",
    path: ["easy"],
  });

type FormVals = z.infer<typeof schema>;

export function AssignmentForm() {
  const router = useRouter();
  const [sourceText, setSourceText] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormVals>({
    resolver: zodResolver(schema),
    defaultValues: {
      questionTypes: ["MCQ", "Theory"],
      numberOfQuestions: 10,
      totalMarks: 50,
      easy: 40,
      medium: 40,
      hard: 20,
    },
  });

  async function onSubmit(v: FormVals) {
    setLoading(true);
    try {
      const { data } = await api.post("/assignments", {
        title: v.title,
        subject: v.subject,
        dueDate: v.dueDate,
        sourceText,
        config: {
          questionTypes: v.questionTypes,
          numberOfQuestions: v.numberOfQuestions,
          totalMarks: v.totalMarks,
          difficulty: { easy: v.easy, medium: v.medium, hard: v.hard },
          instructions: v.instructions ?? "",
        },
      });
      toast.success("Assignment created. Generating...");
      router.push(`/assignment/${data._id}`);
    } catch (e: any) {
      toast.error(e?.response?.data?.error ?? "Failed to create");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <Input
          label="Assignment Title"
          placeholder="e.g. DBMS Mid-term"
          {...register("title")}
          error={errors.title?.message}
        />
        <Input
          label="Subject"
          placeholder="e.g. Database Systems"
          {...register("subject")}
          error={errors.subject?.message}
        />
        <Input
          type="date"
          label="Due Date"
          {...register("dueDate")}
          error={errors.dueDate?.message}
        />
        <Input
          type="number"
          label="Number of Questions"
          {...register("numberOfQuestions")}
          error={errors.numberOfQuestions?.message}
          min={1}
        />
        <Input
          type="number"
          label="Total Marks"
          {...register("totalMarks")}
          error={errors.totalMarks?.message}
          min={1}
        />
      </div>

      <div>
        <span className="block mb-2 text-sm font-medium text-slate-700">
          Question Types
        </span>
        <Controller
          control={control}
          name="questionTypes"
          render={({ field }) => (
            <QuestionConfig selected={field.value} onChange={field.onChange} />
          )}
        />
        {errors.questionTypes && (
          <p className="mt-1 text-xs text-red-600">
            {errors.questionTypes.message as string}
          </p>
        )}
      </div>

      <div>
        <span className="block mb-2 text-sm font-medium text-slate-700">
          Difficulty Distribution (%)
        </span>
        <div className="grid grid-cols-3 gap-4">
          <Input type="number" label="Easy" {...register("easy")} />
          <Input type="number" label="Medium" {...register("medium")} />
          <Input type="number" label="Hard" {...register("hard")} />
        </div>
        {errors.easy && (
          <p className="mt-1 text-xs text-red-600">{errors.easy.message}</p>
        )}
      </div>

      <FileUpload onText={setSourceText} />

      <div>
        <span className="block mb-1.5 text-sm font-medium text-slate-700">
          Additional Instructions
        </span>
        <textarea
          {...register("instructions")}
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none"
          placeholder="Focus on normalization, indexing, transactions..."
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Generate Paper →"}
        </Button>
      </div>
    </form>
  );
}