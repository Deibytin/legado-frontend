import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, label, id, ...props },
  ref,
) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
      <span>{label}</span>
      <input
        id={inputId}
        className={cn(
          "h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none ring-brand/20 transition placeholder:text-slate-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-950",
          error && "border-red-500 focus:ring-red-200",
          className,
        )}
        ref={ref}
        {...props}
      />
      {error ? <span className="text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
});
