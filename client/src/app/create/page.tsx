import { AssignmentForm } from "@/components/assignment/AssignmentForm";

export default function CreatePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Create Assignment</h1>
        <p className="text-slate-500 mt-1">
          Configure your paper — AI handles the rest.
        </p>
      </header>
      <div className="card p-8">
        <AssignmentForm />
      </div>
    </div>
  );
}