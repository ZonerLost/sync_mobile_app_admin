import React from "react";
import { classNames } from "../utils/classNames";

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fullWidth?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  loading,
  fullWidth,
  children,
  disabled,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={classNames(
        "inline-flex items-center justify-center rounded-full",
        "bg-blue-600 px-6 py-3 text-sm font-semibold text-white",
        "shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300",
        fullWidth ? "w-full" : "",
        rest.className || ""
      )}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  );
};

export default PrimaryButton;
