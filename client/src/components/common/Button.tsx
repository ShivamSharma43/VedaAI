import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  variant = "primary",
  className,
  ...rest
}: Props) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/20",
        variant === "secondary" &&
          "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
        variant === "ghost" && "text-slate-600 hover:bg-slate-100",
        className
      )}
      {...rest}
    />
  );
}