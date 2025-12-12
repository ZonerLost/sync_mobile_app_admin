import React from "react";
import { cn } from "../../utils/cn";

interface StatCardProps {
  label: string;
  value: string | number;
  subLabel?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subLabel,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-2xl bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-gray-100",
        className
      )}
    >
      <span className="text-[11px] font-medium text-gray-500">
        {label}
      </span>
      <div>
        <span className="text-base font-semibold text-gray-900">
          {value}
        </span>
        {subLabel && (
          <p className="mt-1 text-[11px] text-gray-500">{subLabel}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
