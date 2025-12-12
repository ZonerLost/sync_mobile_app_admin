import React from "react";
import { classNames } from "../utils/classNames";

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  rightIcon,
  onRightIconClick,
  ...inputProps
}) => {
  return (
    <label className="block w-full text-xs font-medium text-gray-700">
      {label && <span className="mb-1 block">{label}</span>}
      <div
        className={classNames(
          "flex items-center rounded-2xl border border-gray-200 bg-white px-4",
          "h-12 shadow-[0_0_0_1px_rgba(15,23,42,0.02)]",
          "focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
        )}
      >
        <input
          {...inputProps}
          className={classNames(
            "flex-1 border-none bg-transparent text-sm text-gray-900 outline-none",
            "placeholder:text-gray-400"
          )}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
          >
            {rightIcon}
          </button>
        )}
      </div>
      {error && (
        <span className="mt-1 block text-xs text-red-500">{error}</span>
      )}
    </label>
  );
};

export default TextField;
