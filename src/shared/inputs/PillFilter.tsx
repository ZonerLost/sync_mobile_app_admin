import React from "react";
import { cn } from "../../utils/cn";

export type PillVariant =
  | "open"
  | "completed"
  | "onHold"
  | "appointments"
  | "cancelled"
  | "default";

export interface PillFilterProps {
  label: string;
  count?: number;
  variant?: PillVariant;
  active?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<PillVariant, string> = {
  open: "bg-blue-50 text-blue-700",
  completed: "bg-emerald-50 text-emerald-700",
  onHold: "bg-amber-50 text-amber-700",
  appointments: "bg-sky-50 text-sky-700",
  cancelled: "bg-rose-50 text-rose-700",
  default: "bg-gray-100 text-gray-700",
};

const activeRing: Record<PillVariant, string> = {
  open: "ring-1 ring-blue-200",
  completed: "ring-1 ring-emerald-200",
  onHold: "ring-1 ring-amber-200",
  appointments: "ring-1 ring-sky-200",
  cancelled: "ring-1 ring-rose-200",
  default: "ring-1 ring-gray-200",
};

const PillFilter: React.FC<PillFilterProps> = ({
  label,
  count,
  variant = "default",
  active,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        active ? activeRing[variant] : "",
        "transition-colors"
      )}
    >
      <span>{label}</span>
      {typeof count === "number" && (
        <span className="rounded-full bg-white/70 px-1.5 text-[11px] font-semibold text-gray-700">
          {count}
        </span>
      )}
    </button>
  );
};

export default PillFilter;
