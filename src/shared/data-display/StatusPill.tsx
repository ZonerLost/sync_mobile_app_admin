import React from "react";

type Variant = "blue" | "green";

type Props = {
  label: string;
  variant?: Variant;
};

const colorByVariant: Record<Variant, string> = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-emerald-100 text-emerald-600",
};

const StatusPill: React.FC<Props> = ({ label, variant = "green" }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1 text-[11px] font-medium ${colorByVariant[variant]}`}
    >
      {label}
    </span>
  );
};

export default StatusPill;
