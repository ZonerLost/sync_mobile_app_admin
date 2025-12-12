import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { cn } from "../../utils/cn";

interface PasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  containerClassName?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  containerClassName,
  className,
  ...inputProps
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className={cn("flex flex-col gap-1", containerClassName)}>
      {label && (
        <label className="text-[11px] font-medium text-gray-500">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          {...inputProps}
          type={show ? "text" : "password"}
          className={cn(
            "h-11 w-full rounded-2xl border-none bg-[#f3f4f6] px-4 pr-10",
            "text-sm text-gray-900 placeholder:text-gray-400",
            "outline-none ring-0 focus:ring-2 focus:ring-blue-200",
            className
          )}
        />

        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-2 flex items-center justify-center rounded-full p-1 text-gray-500 hover:bg-gray-200/60"
        >
          {show ? (
            <FiEyeOff className="h-4 w-4" />
          ) : (
            <FiEye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
