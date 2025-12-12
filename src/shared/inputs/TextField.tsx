import React from "react";
import { cn } from "../../utils/cn";

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Optional helper text under the field */
  helperText?: string;
  /** Full-width container className */
  containerClassName?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, helperText, containerClassName, className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1", containerClassName)}>
        {label && (
          <label className="text-xs font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-900",
            "placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
            className
          )}
          {...props}
        />
        {helperText && (
          <p className="text-[11px] text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
