import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { cn } from "../../utils/cn";

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isDestructive?: boolean; // for Logout style
}

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  label,
  onClick,
  isDestructive,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-3xl bg-white px-4 py-3 text-sm shadow-sm",
        "hover:bg-gray-50"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600",
            isDestructive && "bg-rose-50 text-rose-500"
          )}
        >
          {icon}
        </div>
        <span
          className={cn(
            "text-sm font-medium text-gray-800",
            isDestructive && "text-rose-500"
          )}
        >
          {label}
        </span>
      </div>

      <FiChevronRight className="h-4 w-4 text-gray-400" />
    </button>
  );
};

export default SettingRow;
