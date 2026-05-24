export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}