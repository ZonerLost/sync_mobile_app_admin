import React from "react";
import { cn } from "../../utils/cn";

export interface DateFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

const DateField = React.forwardRef<HTMLInputElement, DateFieldProps>(
  ({ label, containerClassName, className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1", containerClassName)}>
        {label && (
          <label className="text-xs font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="date"
          className={cn(
            "h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-900",
            "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

DateField.displayName = "DateField";

export default DateField;
