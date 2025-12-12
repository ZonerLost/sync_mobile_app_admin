import React from "react";
import { cn } from "../../utils/cn";

export interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  containerClassName?: string;
}

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, helperText, containerClassName, className, children, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1", containerClassName)}>
        {label && (
          <label className="text-xs font-medium text-gray-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-900",
            "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {helperText && (
          <p className="text-[11px] text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
