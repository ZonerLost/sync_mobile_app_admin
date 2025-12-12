import React from "react";
import { FiSearch } from "react-icons/fi";
import { cn } from "../../utils/cn";
import TextField, { type TextFieldProps } from "./TextField";

type SearchFieldProps = Omit<TextFieldProps, "type">;

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <TextField
          ref={ref}
          type="text"
          className={cn("pl-10", className)}
          {...props}
        />
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    );
  }
);

SearchField.displayName = "SearchField";

export default SearchField;
