import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: Array<{ label: string; value: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, error, label, options, id, ...props },
  ref,
) {
  const selectId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
      <span>{label}</span>
      <select
        id={selectId}
        className={cn(
          "h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none ring-brand/20 transition focus:ring-4 dark:border-slate-700 dark:bg-slate-950",
          error && "border-red-500 focus:ring-red-200",
          className,
        )}
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
});
