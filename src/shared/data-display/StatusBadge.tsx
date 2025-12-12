import React from "react";
import { cn } from "../../utils/cn";

export type StatusVariant =
  | "completed"
  | "active"
  | "free"
  | "cancelled"
  | "default";

interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: StatusVariant;
}

const variantStyles: Record<StatusVariant, string> = {
  completed: "bg-emerald-50 text-emerald-700",
  active: "bg-blue-50 text-blue-700",
  free: "bg-indigo-50 text-indigo-700",
  cancelled: "bg-rose-50 text-rose-700",
  default: "bg-gray-100 text-gray-700",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  variant = "default",
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        variantStyles[variant]
      )}
    >
      {children}
    </span>
  );
};

export default StatusBadge;
