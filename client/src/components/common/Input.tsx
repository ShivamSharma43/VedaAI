import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, ...rest }, ref) => (
    <label className="block">
      {label && (
        <span className="block mb-1.5 text-sm font-medium text-slate-700">
          {label}
        </span>
      )}
      <input
        ref={ref}
        className={clsx(
          "w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition",
          "border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
          error && "border-red-400 focus:border-red-500 focus:ring-red-100",
          className
        )}
        {...rest}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
);
Input.displayName = "Input";