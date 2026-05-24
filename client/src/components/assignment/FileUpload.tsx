"use client";
import { Upload } from "lucide-react";
import { useState } from "react";

export function FileUpload({
  onText,
}: {
  onText: (text: string) => void;
}) {
  const [name, setName] = useState<string>();

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setName(file.name);
    const text = await file.text();
    onText(text);
  }

  return (
    <label className="block border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-brand-400 transition cursor-pointer bg-slate-50/40">
      <Upload className="mx-auto mb-2 text-brand-600" size={26} />
      <div className="text-sm font-medium text-slate-700">
        {name ?? "Upload reference (PDF/Text)"}
      </div>
      <div className="text-xs text-slate-400 mt-1">
        Optional · improves AI accuracy
      </div>
      <input
        type="file"
        accept=".txt,.pdf,.md"
        onChange={onFile}
        className="hidden"
      />
    </label>
  );
}