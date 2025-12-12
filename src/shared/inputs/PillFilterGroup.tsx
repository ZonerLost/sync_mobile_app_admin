import React from "react";
import PillFilter, { type PillVariant } from "./PillFilter";

export interface PillOption {
  id: string;
  label: string;
  count?: number;
  variant?: PillVariant;
}

interface PillFilterGroupProps {
  options: PillOption[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}

const PillFilterGroup: React.FC<PillFilterGroupProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={className ? className : "flex flex-wrap gap-2"}>
      {options.map((opt) => (
        <PillFilter
          key={opt.id}
          label={opt.label}
          count={opt.count}
          variant={opt.variant}
          active={value === opt.id}
          onClick={() => onChange(opt.id)}
        />
      ))}
    </div>
  );
};

export default PillFilterGroup;
