import React from "react";
import { cn } from "../../utils/cn";

interface SectionCardProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  actions,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-100 bg-white p-4 shadow-sm",
        className
      )}
    >
      {(title || description || actions) && (
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            {title && (
              <h2 className="text-sm font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-xs text-gray-500">{description}</p>
            )}
          </div>
          {actions}
        </div>
      )}

      {children}
    </div>
  );
};

export default SectionCard;
